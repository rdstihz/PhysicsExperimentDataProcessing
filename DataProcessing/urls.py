from django.urls import path, include

from DataProcessing import views

urlpatterns = [
    path('getfigure/', views.getfigure, name='exp_getfigure'),
    path('getfigure2/', views.getfigure2, name='exp_getfigure2'),
    path('getfigure3/', views.getfigure3, name='exp_getfigure3'),
    path('calculator/', views.calculator, name='toolbox_caculator'),

    path('electrostatic/', views.electrostatic_field, name='exp_air_cushion'),
    # path('air_cushion/', views.air_cushion, name='exp_air_cushion'),
    path('air_cushion/', views.air_cushion, name='exp_air_cushion'),
    path('rotational_inertia/', views.rotational_inertia, name='exp_rotational_inertia'),
    path('newton_rings/', views.newton_rings, name='exp_newton_rings'),
    path('simple_pendlum/', views.simple_pendlum, name='exp_simple_pendlum'),
]
