/**
 * HMI.API
 * This document describe the endpoints to use in the UI to connect with the entire CVS system.
 *
 * The version of the OpenAPI document: v1
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
/* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional }                      from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
         HttpResponse, HttpEvent, HttpParameterCodec }       from '@angular/common/http';
import { CustomHttpParameterCodec }                          from '../encoder';
import { Observable }                                        from 'rxjs';

import { CreateUserRequest } from '../model/models';
import { ErrorResponse } from '../model/models';
import { ResetPasswordAdminRequest } from '../model/models';
import { ResetPasswordRequest } from '../model/models';
import { UpdateUserRequest } from '../model/models';
import { UserResponse } from '../model/models';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


export interface UsersIdDeleteRequestParams {
    /** The user identifier. */
    id: number;
}

export interface UsersIdGetRequestParams {
    /** The user identifier. */
    id: number;
}

export interface UsersIdPutRequestParams {
    /** The user identifier. */
    id: number;
    /** The user information to update. */
    updateUserRequest?: UpdateUserRequest;
}

export interface UsersPostRequestParams {
    /** The user information to create. */
    createUserRequest?: CreateUserRequest;
}

export interface UsersResetPasswordAdminPostRequestParams {
    /** The passeord reset data. */
    resetPasswordAdminRequest?: ResetPasswordAdminRequest;
}

export interface UsersResetPasswordPostRequestParams {
    /** The passeord reset data. */
    resetPasswordRequest?: ResetPasswordRequest;
}


@Injectable({
  providedIn: 'root'
})
export class UsersService {

    protected basePath = 'http://localhost';
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();
    public encoder: HttpParameterCodec;

    constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
        if (configuration) {
            this.configuration = configuration;
        }
        if (typeof this.configuration.basePath !== 'string') {
            if (typeof basePath !== 'string') {
                basePath = this.basePath;
            }
            this.configuration.basePath = basePath;
        }
        this.encoder = this.configuration.encoder || new CustomHttpParameterCodec();
    }



    private addToHttpParams(httpParams: HttpParams, value: any, key?: string): HttpParams {
        if (typeof value === "object" && value instanceof Date === false) {
            httpParams = this.addToHttpParamsRecursive(httpParams, value);
        } else {
            httpParams = this.addToHttpParamsRecursive(httpParams, value, key);
        }
        return httpParams;
    }

    private addToHttpParamsRecursive(httpParams: HttpParams, value?: any, key?: string): HttpParams {
        if (value == null) {
            return httpParams;
        }

        if (typeof value === "object") {
            if (Array.isArray(value)) {
                (value as any[]).forEach( elem => httpParams = this.addToHttpParamsRecursive(httpParams, elem, key));
            } else if (value instanceof Date) {
                if (key != null) {
                    httpParams = httpParams.append(key,
                        (value as Date).toISOString().substr(0, 10));
                } else {
                   throw Error("key may not be null if value is Date");
                }
            } else {
                Object.keys(value).forEach( k => httpParams = this.addToHttpParamsRecursive(
                    httpParams, value[k], key != null ? `${key}.${k}` : k));
            }
        } else if (key != null) {
            httpParams = httpParams.append(key, value);
        } else {
            throw Error("key may not be null if value is not object or array");
        }
        return httpParams;
    }

    /**
     * Get all users registered. Only users with admin role can perform this action.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public usersGet(observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json'}): Observable<Array<UserResponse>>;
    public usersGet(observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json'}): Observable<HttpResponse<Array<UserResponse>>>;
    public usersGet(observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json'}): Observable<HttpEvent<Array<UserResponse>>>;
    public usersGet(observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json'}): Observable<any> {

        let headers = this.defaultHeaders;

        // authentication (Bearer) required
        if (this.configuration.apiKeys) {
            const key: string | undefined = this.configuration.apiKeys["Bearer"] || this.configuration.apiKeys["Authorization"];
            if (key) {
                headers = headers.set('Authorization', key);
            }
        }

        let httpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (httpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        let responseType: 'text' | 'json' = 'json';
        if(httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
            responseType = 'text';
        }

        return this.httpClient.get<Array<UserResponse>>(`${this.configuration.basePath}/users`,
            {
                responseType: <any>responseType,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Delete the current logged user or if the current user has admin role, it deletes the specified user.
     * @param requestParameters
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public usersIdDelete(requestParameters: UsersIdDeleteRequestParams, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json'}): Observable<any>;
    public usersIdDelete(requestParameters: UsersIdDeleteRequestParams, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json'}): Observable<HttpResponse<any>>;
    public usersIdDelete(requestParameters: UsersIdDeleteRequestParams, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json'}): Observable<HttpEvent<any>>;
    public usersIdDelete(requestParameters: UsersIdDeleteRequestParams, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json'}): Observable<any> {
        const id = requestParameters.id;
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling usersIdDelete.');
        }

        let headers = this.defaultHeaders;

        // authentication (Bearer) required
        if (this.configuration.apiKeys) {
            const key: string | undefined = this.configuration.apiKeys["Bearer"] || this.configuration.apiKeys["Authorization"];
            if (key) {
                headers = headers.set('Authorization', key);
            }
        }

        let httpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (httpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        let responseType: 'text' | 'json' = 'json';
        if(httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
            responseType = 'text';
        }

        return this.httpClient.delete<any>(`${this.configuration.basePath}/users/${encodeURIComponent(String(id))}`,
            {
                responseType: <any>responseType,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Get the user information by its identifier. Only authenticated users can perform this action.
     * @param requestParameters
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public usersIdGet(requestParameters: UsersIdGetRequestParams, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json'}): Observable<UserResponse>;
    public usersIdGet(requestParameters: UsersIdGetRequestParams, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json'}): Observable<HttpResponse<UserResponse>>;
    public usersIdGet(requestParameters: UsersIdGetRequestParams, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json'}): Observable<HttpEvent<UserResponse>>;
    public usersIdGet(requestParameters: UsersIdGetRequestParams, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json'}): Observable<any> {
        const id = requestParameters.id;
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling usersIdGet.');
        }

        let headers = this.defaultHeaders;

        // authentication (Bearer) required
        if (this.configuration.apiKeys) {
            const key: string | undefined = this.configuration.apiKeys["Bearer"] || this.configuration.apiKeys["Authorization"];
            if (key) {
                headers = headers.set('Authorization', key);
            }
        }

        let httpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (httpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        let responseType: 'text' | 'json' = 'json';
        if(httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
            responseType = 'text';
        }

        return this.httpClient.get<UserResponse>(`${this.configuration.basePath}/users/${encodeURIComponent(String(id))}`,
            {
                responseType: <any>responseType,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Update the information of a specified user. Only authenticated users can perform this action.
     * Sample request:        PUT /users/{id}      {          \&quot;username\&quot;: \&quot;dojo\&quot;,          \&quot;firstName\&quot;: \&quot;John\&quot;,          \&quot;lastName\&quot;: \&quot;Doe\&quot;,          \&quot;role\&quot;: \&quot;Operator\&quot;,          \&quot;password\&quot;: \&quot;Test123.\&quot;      }
     * @param requestParameters
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public usersIdPut(requestParameters: UsersIdPutRequestParams, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json'}): Observable<any>;
    public usersIdPut(requestParameters: UsersIdPutRequestParams, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json'}): Observable<HttpResponse<any>>;
    public usersIdPut(requestParameters: UsersIdPutRequestParams, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json'}): Observable<HttpEvent<any>>;
    public usersIdPut(requestParameters: UsersIdPutRequestParams, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json'}): Observable<any> {
        const id = requestParameters.id;
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling usersIdPut.');
        }
        const updateUserRequest = requestParameters.updateUserRequest;

        let headers = this.defaultHeaders;

        // authentication (Bearer) required
        if (this.configuration.apiKeys) {
            const key: string | undefined = this.configuration.apiKeys["Bearer"] || this.configuration.apiKeys["Authorization"];
            if (key) {
                headers = headers.set('Authorization', key);
            }
        }

        let httpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (httpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json-patch+json',
            'application/json',
            'text/json',
            'application/_*+json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        let responseType: 'text' | 'json' = 'json';
        if(httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
            responseType = 'text';
        }

        return this.httpClient.put<any>(`${this.configuration.basePath}/users/${encodeURIComponent(String(id))}`,
            updateUserRequest,
            {
                responseType: <any>responseType,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Register a new user into the system, only users with admin role can create new users.
     * Sample request:        POST /users/      {          \&quot;username\&quot;: \&quot;dojo\&quot;,          \&quot;firstName\&quot;: \&quot;John\&quot;,          \&quot;lastName\&quot;: \&quot;Doe\&quot;,          \&quot;role\&quot;:  \&quot;Operator\&quot;,          \&quot;password\&quot;: \&quot;Test123.\&quot;      }
     * @param requestParameters
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public usersPost(requestParameters: UsersPostRequestParams, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json'}): Observable<UserResponse>;
    public usersPost(requestParameters: UsersPostRequestParams, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json'}): Observable<HttpResponse<UserResponse>>;
    public usersPost(requestParameters: UsersPostRequestParams, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json'}): Observable<HttpEvent<UserResponse>>;
    public usersPost(requestParameters: UsersPostRequestParams, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json'}): Observable<any> {
        const createUserRequest = requestParameters.createUserRequest;

        let headers = this.defaultHeaders;

        // authentication (Bearer) required
        if (this.configuration.apiKeys) {
            const key: string | undefined = this.configuration.apiKeys["Bearer"] || this.configuration.apiKeys["Authorization"];
            if (key) {
                headers = headers.set('Authorization', key);
            }
        }

        let httpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (httpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json-patch+json',
            'application/json',
            'text/json',
            'application/_*+json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        let responseType: 'text' | 'json' = 'json';
        if(httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
            responseType = 'text';
        }

        return this.httpClient.post<UserResponse>(`${this.configuration.basePath}/users`,
            createUserRequest,
            {
                responseType: <any>responseType,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Reset the user password, only users with admin role can create new users.
     * Sample request:        POST /users/reset-password      {          \&quot;username\&quot;: \&quot;dojo\&quot;,          \&quot;newPassword\&quot;: \&quot;NewPassword\&quot;      }
     * @param requestParameters
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public usersResetPasswordAdminPost(requestParameters: UsersResetPasswordAdminPostRequestParams, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json'}): Observable<any>;
    public usersResetPasswordAdminPost(requestParameters: UsersResetPasswordAdminPostRequestParams, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json'}): Observable<HttpResponse<any>>;
    public usersResetPasswordAdminPost(requestParameters: UsersResetPasswordAdminPostRequestParams, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json'}): Observable<HttpEvent<any>>;
    public usersResetPasswordAdminPost(requestParameters: UsersResetPasswordAdminPostRequestParams, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json'}): Observable<any> {
        const resetPasswordAdminRequest = requestParameters.resetPasswordAdminRequest;

        let headers = this.defaultHeaders;

        // authentication (Bearer) required
        if (this.configuration.apiKeys) {
            const key: string | undefined = this.configuration.apiKeys["Bearer"] || this.configuration.apiKeys["Authorization"];
            if (key) {
                headers = headers.set('Authorization', key);
            }
        }

        let httpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (httpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json-patch+json',
            'application/json',
            'text/json',
            'application/_*+json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        let responseType: 'text' | 'json' = 'json';
        if(httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
            responseType = 'text';
        }

        return this.httpClient.post<any>(`${this.configuration.basePath}/users/reset-password-admin`,
            resetPasswordAdminRequest,
            {
                responseType: <any>responseType,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Reset the user password. Only authenticated users can perform this action.
     * Sample request:        POST /users/reset-password      {          \&quot;oldPassword\&quot;: \&quot;Test123.\&quot;          \&quot;newPassword\&quot;: \&quot;NewPassword\&quot;      }
     * @param requestParameters
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public usersResetPasswordPost(requestParameters: UsersResetPasswordPostRequestParams, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json'}): Observable<any>;
    public usersResetPasswordPost(requestParameters: UsersResetPasswordPostRequestParams, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json'}): Observable<HttpResponse<any>>;
    public usersResetPasswordPost(requestParameters: UsersResetPasswordPostRequestParams, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json'}): Observable<HttpEvent<any>>;
    public usersResetPasswordPost(requestParameters: UsersResetPasswordPostRequestParams, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json'}): Observable<any> {
        const resetPasswordRequest = requestParameters.resetPasswordRequest;

        let headers = this.defaultHeaders;

        // authentication (Bearer) required
        if (this.configuration.apiKeys) {
            const key: string | undefined = this.configuration.apiKeys["Bearer"] || this.configuration.apiKeys["Authorization"];
            if (key) {
                headers = headers.set('Authorization', key);
            }
        }

        let httpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (httpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json-patch+json',
            'application/json',
            'text/json',
            'application/_*+json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        let responseType: 'text' | 'json' = 'json';
        if(httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
            responseType = 'text';
        }

        return this.httpClient.post<any>(`${this.configuration.basePath}/users/reset-password`,
            resetPasswordRequest,
            {
                responseType: <any>responseType,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
