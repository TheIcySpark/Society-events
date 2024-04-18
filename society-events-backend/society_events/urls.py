"""
URL configuration for society_events project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path, include
from society_events_app.views import *
from django.contrib.auth import views as auth_views
from django.contrib import admin


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', home, name='home'),
    path('links/', get_links, name='get-links'),
    path('hello/', hello_world, name='hello-world'),
    path('goodbye/', goodbye_world, name='goodbye-world'),
    # URLs para autenticación y generación de tokens JWT
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('create-user/', CreateUserAPIView.as_view(), name='create-user'),

    path('accounts/', include('django.contrib.auth.urls')),
]
