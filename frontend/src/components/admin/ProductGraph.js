import React, { useEffect, useRef } from 'react';
import { Chart, LineController, LineElement, PointElement, LinearScale, Title, CategoryScale } from 'chart.js';
import '../../App.css';

const ProductGraph = () => {
    const canvasRef = useRef(null); // Referência para o elemento canvas
    const chartRef = useRef(null); // Referência para o gráfico Chart.js

    useEffect(() => {
        // Registrar os componentes necessários do Chart.js
        Chart.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale);

        const ctx = canvasRef.current.getContext("2d"); // Obter o contexto 2D do canvas

        const xValues = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const yValues = [100, 120, 163, 636, 183, 283, 974, 458, 763, 163, 385, 579];

        if (chartRef.current) {
            chartRef.current.destroy(); // Destruir o gráfico existente antes de criar um novo
        }

        chartRef.current = new Chart(ctx, {
            type: 'line', // Tipo do gráfico
            data: {
                labels: xValues,
                datasets: [{
                    backgroundColor: "rgba(0,0,255,1.0)",
                    borderColor: "rgba(0,0,255,0.1)",
                    data: yValues
                }]
            },
            options: {
                scales: {
                    x: {
                        grid: {
                            display: true,
                            color: "rgba(255,255,255,50)", // Cor das linhas de fundo
                            lineWidth: 1, // Largura das linhas de fundo
                            drawBorder: false, // Desenhar a borda da área do gráfico
                            drawOnChartArea: true // Desenhar linhas dentro da área do gráfico
                        },
                        ticks: {
                            maxRotation: 0, // Girar o texto para ser horizontal
                            minRotation: 0, // Garante que o texto seja horizontal
                            autoSkip: true, // Skipa automaticamente ticks se eles se sobrepuserem
                            maxTicksLimit: 12 // Número máximo de ticks a serem exibidos
                        }
                    },
                    y: {
                        grid: {
                            display: true,
                            color: "rgba(0,0,0,0.1)", // Cor das linhas de fundo
                            lineWidth: 1, // Largura das linhas de fundo
                            drawBorder: false, // Desenhar a borda da área do gráfico
                            drawOnChartArea: true // Desenhar linhas dentro da área do gráfico
                        }
                    }
                }
            }
        });

        return () => {
            if (chartRef.current) {
                chartRef.current.destroy(); // Destruir o gráfico ao desmontar o componente
            }
        };
    }, []);

    return (
        <div className="box-container p-3 roundbg d-flex" style={{height: '500px'}}>
            <div className="col-12">
                <canvas ref={canvasRef} style={{ width: "100%", margin: "auto"}}></canvas>
            </div>
        </div>
    );
}

export default ProductGraph;

/* Exemplo com db
// src/ProductGraph.js
import React, { useEffect, useRef, useState } from 'react';
import { Chart, LineController, LineElement, PointElement, LinearScale, Title, CategoryScale } from 'chart.js';

const ProductGraph = () => {
    const canvasRef = useRef(null);
    const chartRef = useRef(null);
    const [monthlyData, setMonthlyData] = useState({ labels: [], profits: [] });

    useEffect(() => {
        // Registrar os componentes necessários
        Chart.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale);

        // Buscar dados da API
        const fetchData = async () => {
            try {
                const response = await fetch('/api/monthly-profits'); // Substituir pelo endpoint da sua API
                const data = await response.json();
                
                const labels = data.map(item => item.month); // Supondo que o formato dos dados seja [{ month: "January", profit: 500 }, ...]
                const profits = data.map(item => item.profit);

                setMonthlyData({ labels, profits });
            } catch (error) {
                console.error("Erro ao buscar dados: ", error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (!monthlyData.labels.length) return;

        const ctx = canvasRef.current.getContext("2d");

        if (chartRef.current) {
            chartRef.current.destroy();
        }

        chartRef.current = new Chart(ctx, {
            type: 'line',
            data: {
                labels: monthlyData.labels,
                datasets: [{
                    label: 'Monthly Profits',
                    backgroundColor: "rgba(0,0,255,1.0)",
                    borderColor: "rgba(0,0,255,0.1)",
                    data: monthlyData.profits
                }]
            },
        });

        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
            }
        };
    }, [monthlyData]);

    return (
        <div className="box-container bg-white roundbg d-flex h-100">
            <div className="col-12">
                <canvas ref={canvasRef} style={{ width: "100%"}}></canvas>
            </div>
        </div>
    );
}

export default ProductGraph;
*/

/* Backend
// server.js
const express = require('express');
const app = express();

app.get('/api/monthly-profits', (req, res) => {
    const monthlyProfits = [
        { month: "January", profit: 500 },
        { month: "February", profit: 1000 },
        { month: "March", profit: 1500 },
        { month: "April", profit: 2000 },
        { month: "May", profit: 2500 },
        // Adicionar mais dados conforme necessário
    ];
    res.json(monthlyProfits);
});

const port = 5000;
app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));

*/
