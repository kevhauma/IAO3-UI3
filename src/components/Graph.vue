<template>
    <div>
        <line-chart v-if="graphData" class="graph" :chartData="graphData"></line-chart>
    </div>
</template>

<script>
    import LineChart from '../util/graph/lineGraph.js'
    import {
        colors
    } from 'quasar'

    export default {
        components: {
            LineChart
        },
        props: {
            chartdata: {
                type: Array
            }
        },
        data() {
            return {
                graphData: null
            }
        },
        mounted() {
            this.fillData()
        },
        methods: {
            fillData() {
                this.graphData = {
                    labels: this.chartdata.map(d=>""),
                    datasets: [{
                        label: 'HeartRate',
                        data: this.chartdata,
                        backgroundColor: colors.getBrand('primary'),
                        pointColor : "rgba(0,0,0,0)",
                        pointStrokeColor : "rgba(0,0,0,0)",
                    }],
                    options: {
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true
                                },
                                gridLines: {
                                    display: true
                                }
                            }],
                            xAxes: [{
                                gridLines: {
                                    display: false
                                }
                            }]
                        },
                        legend: {
                            display: true
                        },
                        responsive: true,
                        maintainAspectRatio: false
                    }
                }
            }
        },
        watch: {
            chartdata: {
                handler(newData, oldData) {
                    this.fillData()
                },
                deep: true,
                immediate: true
            }
        }

    }

</script>

<style>


</style>
