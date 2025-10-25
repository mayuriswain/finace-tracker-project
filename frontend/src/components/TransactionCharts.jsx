import { useMemo } from "react";
import { useSelector } from "react-redux";
import { Chart, ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import { Pie, Bar } from "react-chartjs-2";

Chart.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function TransactionCharts() {
  const transactions = useSelector((state) => state.transactions?.list || []);

  // Prepare data for Pie Chart (Expense by Category)
  const pieData = useMemo(() => {
    const expenses = transactions.filter((t) => t.type === "expense");
    const categoryTotals = expenses.reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + Number(t.amount);
      return acc;
    }, {});
    return {
      labels: Object.keys(categoryTotals),
      datasets: [
        {
          data: Object.values(categoryTotals),
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#4BC0C0",
            "#9966FF",
            "#FF9F40",
          ],
        },
      ],
    };
  }, [transactions]);

  // Prepare data for Bar Chart (Monthly Spending)
  const barData = useMemo(() => {
    const expenses = transactions.filter((t) => t.type === "expense");
    const monthlyTotals = {};

    expenses.forEach((t) => {
      const month = new Date(t.date).toLocaleString("default", { month: "short", year: "numeric" });
      monthlyTotals[month] = (monthlyTotals[month] || 0) + Number(t.amount);
    });

    const sortedMonths = Object.keys(monthlyTotals).sort(
      (a, b) => new Date(a) - new Date(b)
    );

    return {
      labels: sortedMonths,
      datasets: [
        {
          label: "Monthly Expenses",
          data: sortedMonths.map((m) => monthlyTotals[m]),
          backgroundColor: "#36A2EB",
        },
      ],
    };
  }, [transactions]);

  return (
    <div className="container mt-5">
      <h3 className="mb-4">Expense Data Visualization</h3>
      <div className="row">
        <div className="col-md-6 mb-4">
          <h5>Expenses by Category</h5>
          <Pie data={pieData} />
        </div>
        <div className="col-md-6 mb-4">
          <h5>Monthly Spending Trends</h5>
          <Bar data={barData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
        </div>
      </div>
    </div>
  );
}
