
const Dashboard = async () => {

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome</p>
      <button onClick={() => fetch('/api/auth/logout').then(() => window.location.href = '/')}>Sign out</button>
    </div>
  );
};

export default Dashboard;
