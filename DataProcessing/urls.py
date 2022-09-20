from django.urls import path, include

from DataProcessing import views

urlpatterns = [
    path('getfigure/', views.getfigure, name='exp_getfigure'),
    path('calculator/', views.calculator, name='toolbox_caculator'),
    path('air_cushion/', views.air_cushion, name='exp_air_cushion'),
    path('rotational_inertia/', views.rotational_inertia, name='exp_rotational_inertia'),
    path('newton_rings/', views.newton_rings, name='exp_newton_rings'),
    path('simple_pendlum', views.rotational_inertia, name='exp_simple_pendlum'),
]
