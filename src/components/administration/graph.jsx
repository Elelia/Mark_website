import React from 'react';
import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";

export default function GraphComponent({categories, data}) {
    const load = {
        labels: categories,
        datasets: [
            {
                label: 'Nombre de vues',
                backgroundColor: "rgb(255, 99, 132)",
                borderColor: "rgb(255, 99, 132)",
                data: data
            },
        ],
    };

    return (
        <div>
            <Bar data={load} />
        </div>
    );
}
