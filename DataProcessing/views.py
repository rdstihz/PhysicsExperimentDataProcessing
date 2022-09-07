from django.shortcuts import render
from django.http import JsonResponse
from django.conf import settings

from io import BytesIO
import base64

from matplotlib import pyplot as plt
from datetime import datetime


# Create your views here.

def index(request):
    return render(request, 'DataProcessing/index.html')


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

    # 调整坐标轴
    ax = plt.gca()

    # 去掉右边和上边的线
    ax.spines['right'].set_color("none")
    ax.spines['top'].set_color("none")

    # 让x轴从0开始
    ax.spines['left'].set_position(('data', 0))

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
