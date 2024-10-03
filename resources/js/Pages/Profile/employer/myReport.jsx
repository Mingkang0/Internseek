import DefaultLayout from "@/layout/defaultLayout";
import ApexCharts from "apexcharts";
import { useEffect, useRef } from "react";
import { Head } from "@inertiajs/react"

export default function MyReport({ applicationsData }) {
  console.log(applicationsData);
  const chartRef = useRef(null);

  // Helper function to get month name from index (0-based)
  const getMonthName = (monthIndex) => {
    const date = new Date();
    date.setMonth(monthIndex);
    return date.toLocaleString('default', { month: 'long' });
  };

  useEffect(() => {
    if (!chartRef.current) {
      const chartData = applicationsData.map((value, index) => {
        return {
          x: getMonthName(index), // Get the month name
          y: value,
        };
      });

      const chartOptions = {
        series: [{
          name: 'Internship Applications',
          data: chartData
        }],
        colors: ["#3b82f6"],
        chart: {
          height: 300,
          width: "100%",
          type: "bar",
        },
        stroke: {
          colors: ["white"],
          lineCap: "",
        },
        plotOptions: {
          bar: {
            horizontal: false,
          },
        },
        dataLabels: {
          enabled: true,
          style: {
            fontFamily: "Inter, sans-serif",
          },
        },
        legend: {
          position: "bottom",
          fontFamily: "Inter, sans-serif",
        },
        xaxis: {
          categories: applicationsData.map((_, index) => getMonthName(index)), // Get the month names
          labels: {
            rotate: -45,
          },
        },
        yaxis: {
          labels: {
            formatter: function (value) {
              return value;
            },
          },
        },
      };

      const newChart = new ApexCharts(document.getElementById('chart'), chartOptions);
      newChart.render();
      chartRef.current = newChart;
    }

    // Cleanup on component unmount
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
    };
  }, [applicationsData]);

  return (
    <DefaultLayout>
      <Head title="Internship Applications Report" />
      <div className="bg-gray-200 px-6 py-4 min-h-screen mx-auto overflow-y-auto lg:py-4">
        <div className="mx-auto w-full lg:max-w-4xl">
          <div className="p-5 mb-4 border border-gray-100 rounded-lg bg-white">
            <h5 className="text-center mb-2 text-lg font-bold tracking-tight text-gray-900">Internship Applications Report</h5>
            <hr className="my-2 border-gray-900" />
            <div id="chart"></div>
          </div>

          <div className="p-5 mb-4 border border-gray-100 rounded-lg bg-white">
            <h5 className="text-center mb-2 text-lg font-bold tracking-tight text-gray-900">Internship Applications Summary</h5>
            <hr className="my-2 border-gray-300" />
            <div className="flex justify-center items-center gap-32">
              <div className="text-center">
                <h6 className="text-md font-semibold text-gray-700 mb-2">Total Applications</h6>
                <p className="text-lg font-bold text-gray-900">{applicationsData.reduce((a, b) => a + b, 0)}</p>
              </div>
              <div className="text-center">
                <h6 className="text-md font-semibold text-gray-700 mb-2">Average Applications per Month</h6>
                <p className="text-lg font-bold text-gray-900">{Math.round(applicationsData.reduce((a, b) => a + b, 0) / applicationsData.length)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}
