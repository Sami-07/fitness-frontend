import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";

export default function Bar({ allWeights, allReps }) {
    useEffect(() => {
        
        setChartData((prevData) => ({
            ...prevData,
            options: {
                ...prevData.options,
                xaxis: {
                    categories: allWeights.map(weight => `${weight} kg`),
                    title: {
                        text: "Weight in KG"
                    }
                },
                yaxis: [
                    {
                        title: {
                            text: "No. of Repetitions"
                        }
                    }
                ],
                colors: ["#16C55E"]
            },
            series: [
                {
                    ...prevData.series[0],
                    data: allReps,

                }
            ]
        }));
    }, [allWeights, allReps]);
    const [chartData, setChartData] = useState({
        options: {
            chart: {
                id: "basic-bar"
            },
            xaxis: {
                categories: allWeights
            }
        },
        series: [
            {
                name: "No. of repetitions",
                data: allReps
            }
        ]
    });

    return (
        <div className="">
            <div className="">
                <div className=" mx-3">
                    {(allWeights && allReps) && <Chart
                        options={chartData.options}
                        series={chartData.series}
                        type="bar"
                        width="450"

                    />}
                </div>
            </div>
        </div>
    );
};
;
