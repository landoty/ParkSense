import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';

export default function AvgBusyTimesChart() {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        const data = {
            labels: ['12:00am', '4:00am', '8:00am', '12:00pm', '4:00pm', '8:00pm', '12:00am'],
            datasets: [
                {
                    data: [1, 3, 35, 78, 89, 32, 1],
                    tension: 0.5,
                }
            ],
        };

        const options = {
            maintainAspectRatio: false,
            responsive: true,
            aspectRatio: 0.6,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Time'
                    },
                    ticks: {
                        color: textColorSecondary,
                    },
                    grid: {
                        color: surfaceBorder,
                    },
                },
                y: {
                    title: {
                        display: true,
                        text: 'Cars'
                    },
                    ticks: {
                        color: textColorSecondary,
                    },
                    grid: {
                        color: surfaceBorder,
                    },
                },
            },
        };

        setChartData(data);
        setChartOptions(options);
    }, []);

    return (
        <div className="card" style={{ width: '50vw' }}>
            <Chart type="line" data={chartData} options={chartOptions} />
        </div>
    );
}