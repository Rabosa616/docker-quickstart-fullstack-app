#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443


FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
ARG BUILD_CONFIGURATION=Debug
WORKDIR /src
COPY "HMI.API/HMI.sln" "./HMI.API/"
COPY "HMI.API/HMI.API/*.csproj" "HMI.API/HMI.API/"
COPY "HMI.API/HMI.API.DataAccess/HMI.API.DataAccess.csproj" "HMI.API/HMI.API.DataAccess/"
COPY "HMI.API/HMI.API.Infrastructure/HMI.API.Infrastructure.csproj" "HMI.API/HMI.API.Infrastructure/"
COPY "HMI.API/HMI.API.Services/HMI.API.Services.csproj" "HMI.API/HMI.API.Services/"
COPY "HMI.API/Tests/HMI.API.Tests/*.csproj" "HMI.API/Tests/HMI.API.Tests/"
RUN dotnet restore "HMI.API/HMI.sln"
COPY . .
WORKDIR "/src/HMI.API"
RUN dotnet build "HMI.API/HMI.API.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "HMI.API/HMI.API.csproj" -c Release -o /app/publish

FROM build AS dev
ENV ASPNETCORE_ENVIRONMENT=Development
ENV DOTNET_USE_POLLING_FILE_WATCHER=true
# this env variable avoid default ports (http:5000 and https:5001), which fail to open in the docker image
# WARNING: when we activate https, port 80 stops working (I don't know why). You can enter swagger UI but
# all the controller actions fail to execute.
# ENV ASPNETCORE_URLS=https://+:443;http://+:80
ENV ASPNETCORE_URLS=http://+:80
WORKDIR /app/build
ENTRYPOINT ["dotnet", "HMI.API.dll"]

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "HMI.API.dll"]