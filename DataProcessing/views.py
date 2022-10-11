from django.shortcuts import render
from django.http import JsonResponse
from django.conf import settings
from scipy.interpolate import make_interp_spline

import numpy as np

from io import BytesIO
import base64

from matplotlib import pyplot as plt
from datetime import datetime

plt.rcParams['font.sans-serif'] = ['SimHei']


# Create your views here.mkfontscale

def index(request):
    return render(request, 'DataProcessing/menu.html')


def electrostatic_field(request):
    return render(request, 'DataProcessing/electrostatic_field.html')


def viscosity(requset):
    return render(requset, 'DataProcessing/viscosity_coeficient.html')


def air_cushion(request):
    return render(request, 'DataProcessing/air_cushion.html')


def rotational_inertia(request):
    return render(request, 'DataProcessing/rotational_inertia.html')


def newton_rings(request):
    return render(request, 'DataProcessing/newton_rings.html')


def simple_pendlum(request):
    return render(request, 'DataProcessing/simple_pendlum.html')


def getfigure(request):
    data = request.GET

    x = map(float, data['x'].split(","))
    y = map(float, data['y'].split(","))
    k = float(data['k'])
    b = float(data['b'])
    x = list(x)
    y = list(y)
    plt.scatter(x, y)

    x = [0] + x + [0.1]
    y_fit = [(k * i + b) for i in x]

    plt.plot(x, y_fit)
    plt.xlabel("d/D")
    plt.ylabel("T(S)")
    plt.title("T-1/D figure")

    # 调整坐标轴
    ax = plt.gca()

    # 去掉右边和上边的线
    ax.spines['right'].set_color("none")
    ax.spines['top'].set_color("none")

    # 让x轴从0开始
    ax.spines['left'].set_position(('data', 0))

    sio = BytesIO()
    plt.savefig(sio, format='png', bbox_inches='tight', pad_inches=0.0)
    data = base64.encodebytes(sio.getvalue()).decode()
    src = 'data:image/png;base64,' + str(data)
    # # 记得关闭，不然画出来的图是重复的

    plt.close()

    return JsonResponse({
        'result': "success",
        'src': src,
    })


def getfigure2(request):
    data = request.GET

    x = map(float, data['x'].split(","))
    y = map(float, data['y'].split(","))
    k = float(data['k'])
    b = float(data['b'])
    x = list(x)
    y = list(y)
    plt.scatter(x, y)

    x = [12] + x + [25]
    y_fit = [(k * i + b) for i in x]

    plt.plot(x, y_fit)

    plt.xlabel("K")
    plt.ylabel("D^2  (mm^2)")
    plt.title("newton rings D^2-K figure")

    # 调整坐标轴
    ax = plt.gca()

    # 去掉右边和上边的线
    ax.spines['right'].set_color("none")
    ax.spines['top'].set_color("none")

    # 让x轴从0开始
    ax.spines['left'].set_position(('data', 12))
    plt.xlim([12, 25])
    # file_name = datetime.now().strftime("%Y%m%d%H%M%S" + data['state'] +".png")
    # plt.savefig(str(settings.BASE_DIR) + "/static/temp/" + file_name)

    sio = BytesIO()
    plt.savefig(sio, format='png', bbox_inches='tight', pad_inches=0.0)
    data = base64.encodebytes(sio.getvalue()).decode()
    src = 'data:image/png;base64,' + str(data)
    # # 记得关闭，不然画出来的图是重复的

    plt.close()

    return JsonResponse({
        'result': "success",
        'src': src,
    })


def getfigure3(request):
    data = request.GET

    x = map(float, data['x'].split(","))
    y = map(float, data['y'].split(","))
    k = float(data['k'])
    b = float(data['b'])
    x = list(x)
    y = list(y)
    plt.scatter(x, y)

    x = [65] + x + [110]
    y_fit = [(k * i + b) for i in x]

    plt.plot(x, y_fit)

    plt.xlabel("L(cm)")
    plt.ylabel("T^2 (s^2)")
    plt.title("simple pendlum T^2-L figure")

    # 调整坐标轴
    ax = plt.gca()

    # 去掉右边和上边的线
    ax.spines['right'].set_color("none")
    ax.spines['top'].set_color("none")

    # 让x轴从0开始
    # ax.spines['left'].set_position(('data', 12))
    # file_name = datetime.now().strftime("%Y%m%d%H%M%S" + data['state'] +".png")
    # plt.savefig(str(settings.BASE_DIR) + "/static/temp/" + file_name)

    sio = BytesIO()
    plt.savefig(sio, format='png', bbox_inches='tight', pad_inches=0.0)
    data = base64.encodebytes(sio.getvalue()).decode()
    src = 'data:image/png;base64,' + str(data)
    # # 记得关闭，不然画出来的图是重复的

    plt.close()

    return JsonResponse({
        'result': "success",
        'src': src,
    })


def calculator(request):
    return render(request, 'Toolbox/calculator.html')


def figuredrawer(request):
    return render(request, 'Toolbox/figuredrawer.html')


def getfigure_figuredrawer(request):
    data = request.GET
    x = list(map(float, data['x'].split(' ')))
    y = list(map(float, data['y'].split(' ')))

    x = np.array(x)
    y = np.array(y)

    # Returns evenly spaced numbers
    # over a specified interval.
    D = x.max() - x.min()
    X_ = np.linspace(x.min() - 0.05 * D, x.max() + 0.05 * D, 500)

    poly_str = 'y = '

    if data['fit_type'] == "inter":
        X_Y_Spline = make_interp_spline(x, y)
        Y_ = X_Y_Spline(X_)
    else:
        fit_deg = data['fit_deg']
        if not fit_deg:
            fit_deg = 1
        else:
            fit_deg = int(fit_deg)
        p = np.polyfit(x, y, fit_deg)
        Y_ = np.polyval(p, X_)

        for i in range(fit_deg + 1):
            if i and p[i] >= 0:
                poly_str += '+'
            if fit_deg - i == 1:
                poly_str += '%.4fx' % (p[i])
            elif fit_deg - i == 0:
                poly_str += '%.4f' % (p[i])
            else:
                poly_str += '%.4fx^%d' % (p[i], fit_deg - i)

    print(poly_str)

    if data['type'] == '1' or data['type'] == '3':
        plt.scatter(x, y, marker='x', s=50)
    if data['type'] == '2' or data['type'] == '3':
        plt.plot(X_, Y_, linewidth=1)

    plt.grid()
    # 调整坐标轴
    ax = plt.gca()

    # 去掉右边和上边的线
    ax.spines['right'].set_color("none")
    ax.spines['top'].set_color("none")

    # 标题
    plt.title(data['title'])
    plt.xlabel(data['x_title'])
    plt.ylabel(data['y_title'])

    if data['fit_type'] == 'poly' and data['show_eq'] == "true":
        plt.text(x.max() - D / 1.3, y.max() - D / 3, '$' + poly_str + '$')

    sio = BytesIO()
    plt.savefig(sio, format='png', bbox_inches='tight', pad_inches=0.0)
    data = base64.encodebytes(sio.getvalue()).decode()
    src = 'data:image/png;base64,' + str(data)
    plt.close()
    return JsonResponse({
        'result': "success",
        'src': src,
        'poly_str': poly_str,
    })
