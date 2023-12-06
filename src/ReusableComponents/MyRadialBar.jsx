import { useState } from 'react'

import ReactApexChart from 'react-apexcharts';
export default function MyRadialBar({ percentage, title, labelFontSize, valueFontSize }) {
    const [options, setOptions] = useState({
        series: [percentage],
        chart: {
            height: 20,
            // width : "10%",
            type: 'radialBar',
            toolbar: {
                show: false,
            },
        },
        plotOptions: {
            radialBar: {
                startAngle: -135,
                endAngle: 225,
                hollow: {
                    margin: 0,
                    size: '70%',
                    background: '#fff',
                    image: undefined,
                    imageOffsetX: 0,
                    imageOffsetY: 0,
                    position: 'front',
                    dropShadow: {
                        enabled: true,
                        top: 3,
                        left: 0,
                        blur: 4,
                        opacity: 0.24,
                    },
                },
                track: {
                    background: '#fff',
                    strokeWidth: '67%',
                    margin: 0,
                    dropShadow: {
                        enabled: true,
                        top: -3,
                        left: 0,
                        blur: 4,
                        opacity: 0.35,
                    },
                },
                dataLabels: {
                    show: true,
                    name: {
                        offsetY: -10,
                        show: true,
                        color: '#888',
                        fontSize: labelFontSize,
                    },
                    value: {
                        formatter: function (val) {
                            return parseInt(val) + "%";
                        },
                        color: '#111',
                        fontSize: "valueFontSize",

                        show: true,
                        offsetY: 0
                    },
                },
                // labels: [''], // Move labels here
            },
        },
        fill: {
            type: 'gradient',
            gradient: {
                shade: 'dark',
                type: 'horizontal',
                shadeIntensity: 0.5,
                gradientToColors: ['#ABE5A1'],
                inverseColors: true,
                opacityFrom: 1,
                opacityTo: 1,
                stops: [0, 100],
            },
        },
        stroke: {
            lineCap: 'round',
        },
        labels: [title],
    });
    return (
        <ReactApexChart
            options={options}
            series={options.series}
            type="radialBar"
            height={150}
            width={150}
        />
    )
}
