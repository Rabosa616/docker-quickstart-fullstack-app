
### Change the docker-compose.yml file in the Azure WebApp
az webapp config container set --name erniabbapi --resource-group ABB --multicontainer-config-file docker-compose-az-merged.yml --multicontainer-config-type COMPOSE


# Create ACR and App Service
[GitHub](https://docs.microsoft.com/en-us/azure/app-service/tutorial-custom-container?pivots=container-linux)

Based on this tutorial

https://docs.microsoft.com/en-us/azure/app-service/tutorial-custom-container?pivots=container-linux

### Create resource group
az group create --name ABB --location westeurope

### Create an Azure Container Registry
az acr create --name ErniAbbCvs2 --resource-group ABB --sku Basic --admin-enabled true

### Retrieve credentials for the registry
az acr credential show --resource-group ABB --name ErniAbbCvs2

```
Now with previous password we must create a new Service Connection in our project in **Azure DevOps**.
Azure DevOps -> Project Settings -> Pipelines -> Service Connections -> New -> Docker Registry
Use 'Others' (not Azure Container Registry) if you have your ACR in a different account than your Azure DevOps user.
* Docker Registry: https://erniabbcvs2.azurecr.io
* Docker ID: ErniAbbCvs2
* Password: --one of the passwords retrieved in previous command--
* Service Connection Name: ErniAbbCvs2 (whatever name)

Now you will be able to use this connection name in your YML pipeline in one of your Docker tasks in the parameter 'containerRegistry' like:
containerRegistry: 'ErniAbbCvs2'
(it will also be offered by the DevOps UI when creating the task)
```


### Create an App Service plan
az appservice plan create --name AppSvc-plan --resource-group ABB --is-linux

### Create the web app
az webapp create --resource-group ABB --plan AppSvc-plan --name HMI-WebApp --multicontainer-config-file docker-compose-az-merged.yml --multicontainer-config-type COMPOSE

In the WebApp 'Container settings' we must set also the credentials to connect to the ACR:
* Login: ErniAbbCvs2
* Password: --one of the passwords of the ACR retrieved previously--

```
In order to activate automatic deployment we can do it via 'webhook' beetwen the WebApp and the ACR
1. Copy the webhook available in the WebApp (HMI-WebApp) -> Container Settings in the Azure Portal
The url shoud be something like this
https://$HMI-WebApp:XXXXXXXXXXXXXX@hmi-webapp.scm.azurewebsites.net/docker/hook
2. Go to the ACR (ErniAbbCvs2) in Azure Portal. You will see a chapter called webhooks. Create a new one.
* Service URI: --previous webhook URL--
* Actions: OnPush
* Scope: (you can leave it blank) This might be useful if you only want this webhook to trigger when some specific image is pushed.

Now the WebApp will be redeployed everytime we push an image to the Repository.
```