import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { HttpClient } from '@angular/common/http';
import { BE, isProduction_BE } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  private hubConnection: signalR.HubConnection;
  private baseUrl = "https://localhost:8383/";

  constructor(private http: HttpClient) {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${this.baseUrl}/RealtimeApiHub`) // URL to the SignalR Hub in the .NET Core API
      .build();

    this.hubConnection.start()
      .then(() => console.log('SignalR connection started.'))
      .catch(err => console.error('Error while starting SignalR connection: ', err));

    this.hubConnection.onclose(err =>{
      console.log("Connection closed:", err);
    });

  }
  public async getAll(pageNumber?: number, pageSize?: number): Promise<any>{
    try {
        const result = await this.hubConnection.invoke('GetAll', pageNumber, pageSize);
        console.log("🚀 ~ file: signalr.service.ts:25 ~ SignalRService ~ getAll ~ result:", result)
        return result;
      } catch (error) {
        console.error('Error calling Update method: ', error);
        throw error;
      }
  }
  public async update(orderId: number, orderStatus: string): Promise<boolean> {
    try {
      const result = await this.hubConnection.invoke('Update', orderId, orderStatus);
      return result;
    } catch (error) {
      console.error('Error calling Update method: ', error);
      throw error;
    }
  }

  public async t3pDeliveryInTransit(orderId: number): Promise<boolean> {
    try {
      const result = await this.hubConnection.invoke('T3PDeliveryInTransit', orderId);
      return result;
    } catch (error) {
      console.error('Error calling T3PDeliveryInTransit method: ', error);
      throw error;
    }
  }

  public async t3pDeliveryUpdateSuccessful(orderId: number): Promise<boolean> {
    try {
      const result = await this.hubConnection.invoke('T3PDeliveryUpdateSuccessful', orderId);
      return result;
    } catch (error) {
      console.error('Error calling T3PDeliveryUpdateSuccessful method: ', error);
      throw error;
    }
  }

  public async t3pDeliveryUpdateFail(orderId: number, cancelReason: string): Promise<any> {
    try {
      const result = await this.hubConnection.invoke('T3PDeliveryUpdateFail', orderId, cancelReason);
      return result;
    } catch (error) {
      console.error('Error calling T3PDeliveryUpdateFail method: ', error);
      throw error;
    }
  }

  // Additional method for inventory checking
  public async inventoryChecking(orderId: number): Promise<string | undefined> {
    try {
      const result = await this.http.get<string>(`/api/inventoryChecking/${orderId}`).toPromise();
      return result;
    } catch (error) {
      console.error('Error calling InventoryChecking API: ', error);
      throw error;
    }
  }
  
}
