export default function About() {
  return (
    <>
      <h1 className="page-title">About</h1>

      <section className="card">
        <h2>About SaveYoMoney</h2>
        <p>
          SaveYoMoney helps users record income and expenses,
          understand their spending, and track savings goals.
        </p>
        <p>
          Created as a React final project for our Frontend
          Development course. Features include real-time income and expense calculation,
          category tagging, month & tag filtering, and browser local storage.


        </p>
        
      </section>
      <section className="card">
        <h2>Github Repo: <a href="https://github.com/tilongg/personal-finance-tracker-group4" target="_blank" rel="noopener noreferrer">
          Link
        </a>
        </h2>
        <p>Team Members</p>
        <li>  Tilong</li>
        <li>  Sovichet</li>
        <li>  Yongjiea</li>
      </section>
    </>
  );
}
