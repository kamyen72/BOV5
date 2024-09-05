
var colors = ['#5793f3', '#d14a61', '#675bba'];
var GHLcolors = ['#4281A4', '#48A9A6', '#7180AC','#E84855','#0D1B2A'];

var genBarOption = function (title, xAxis, datas) {
    var series = datas.map(p => {
        return {
            name: p.title,
            type: 'bar',
            data: p.data,
            color: p.color,
            markPoint: {
                data: [
                    { type: 'max', name: '最大值' },
                    { type: 'min', name: '最小值' }
                ]
            },
            markLine: {
                data: [
                    { type: 'average', name: '平均值' }
                ]
            }
        };
    });

    console.log(series);

    var option = {
        title: {
            text: title,
            subtext: '',
            textStyle:{
                color: GHLcolors[0]
            }
          
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: datas.map(p => p.title)
        },
        toolbox: {
            show: true,
            feature: {
                dataView: { show: true, readOnly: false },
                magicType: { show: true, type: ['line', 'bar'] },
                restore: { show: true },
                saveAsImage: { show: true }
            }
        },
        calculable: true,
        xAxis: [
            {
                type: 'category',
                data: xAxis
            }
        ],
        yAxis: [
            {
                type: 'value',
                axisLine: {
                    lineStyle: {
                        color: GHLcolors[4]
                    }
                }
            }
        ],
        series: series
    };

    return option;
};


var genLineBarOption = function (title, xAxis, datas) {
    var series = datas.map((p) => {
        return {
            name: p.title,
            type: p.type,
            data: p.data,
            color:p.color,
            yAxisIndex: p.yIndex
        };
    });

    console.log(series);

    var option = {
        title: {
            text: title,
            subtext: '',
            textStyle:{
                color: GHLcolors[0]
            }
            
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: datas.map(p => p.title)
        },
        toolbox: {
            show: true,
            feature: {
                dataView: { show: true, readOnly: false },
                magicType: { show: true, type: ['line', 'bar'] },
                restore: { show: true },
                saveAsImage: { show: true }
            }
        },
        calculable: true,
        xAxis: [
            {
                type: 'category',
                data: xAxis
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: '%',
                position: 'right',
                min: 0,
                max: 100,
                axisLine: {
                    lineStyle: {
                        color: colors[0]
                    }
                },
                axisLabel: {
                    formatter: '{value} %'
                }
            },
            {
                type: 'value',
                name: 'Amount',
                position: 'left',
                axisLine: {
                    lineStyle: {
                        color: GHLcolors[4]
                    }
                },
                axisLabel: {
                    formatter: '{value} $'
                }
            }
        ],
        series: series
    };

    return option;
};

var genCashRebateOption = function (title, xAxis, datas) {
    var series = datas.map((p,idx) => {
        var obj = {};
        obj = {
            name: p.title,
            type: p.type,
            data: p.data,
            color: p.color
        };

        if (idx > 0) obj.label = {
            normal: {
                formatter: function (data) {
                    return (data.data / datas[0].data[data.dataIndex] * 100).toFixed(2) + '%';
                },
                position: 'top',
                show: true,
                value: 1
            }
        };
        else obj.label = {
            normal: {
                formatter: function (data) {
                    return data.data.toFixed(2);
                },
                position: 'top',
                show: true,
                value: 1
            }
        };

        return obj;
    });

    console.log(series);

    var option = {
        title: {
            text: title,
            subtext: '',
            textStyle: {
                color: GHLcolors[0]
            }

        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: datas.map(p => p.title)
        },
        toolbox: {
            show: true,
            feature: {
                dataView: { show: true, readOnly: false },
                magicType: { show: true, type: ['line', 'bar'] },
                restore: { show: true },
                saveAsImage: { show: true }
            }
        },
        calculable: true,
        xAxis: [
            {
                type: 'category',
                data: xAxis
            }
        ],
        yAxis: [
            {
                type: 'value',
                axisLine: {
                    lineStyle: {
                        color: GHLcolors[4]
                    }
                }
            }
        ],
        series: series
    };

    return option;
};