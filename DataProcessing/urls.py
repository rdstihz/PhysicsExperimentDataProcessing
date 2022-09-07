from django.urls import path, include

from DataProcessing import views

urlpatterns = [
    path('getfigure/', views.getfigure, name='exp_getfigure'),
]