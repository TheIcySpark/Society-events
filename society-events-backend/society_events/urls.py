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
from django.urls import path
from society_events_app.views import (
    home, CustomTokenObtainPairView, CommentView, create_event,
    comment_list, event_list, event_detail, CreateUserAPIView
)
from django.contrib import admin

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', home, name='home'),
    path('api/token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('Comment/', CommentView, name='Comment'),
    path('CreateEvent/', create_event, name='CreateEvent'),
    path('Commentlist/', comment_list, name='Commentlist'),
    path('Eventlist/', event_list, name='Eventlist'),
    path('EventDetail/<int:pk>/', event_detail, name='EventDetail'),
    path('create-user/', CreateUserAPIView.as_view(), name='create-user'),
]
