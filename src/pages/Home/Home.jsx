import { useState, useEffect } from "react";
import "./Home.css";

const SKILLS_TABLE = [
  { category: "big_data", name: "PySpark", level: 95, type: "ENGINE" },
  {
    category: "big_data",
    name: "Azure Databricks",
    level: 92,
    type: "PLATFORM",
  },
  { category: "big_data", name: "Delta Lake", level: 90, type: "STORAGE" },
  {
    category: "orchestration",
    name: "Apache Airflow",
    level: 88,
    type: "ORCH",
  },
  {
    category: "orchestration",
    name: "Azure Data Factory",
    level: 85,
    type: "ORCH",
  },
  { category: "cloud", name: "Azure (ADLS/ADF)", level: 90, type: "CLOUD" },
  { category: "cloud", name: "AWS (S3/Glue/ECS)", level: 80, type: "CLOUD" },
  { category: "lang", name: "Python", level: 95, type: "LANG" },
  { category: "lang", name: "SQL / SparkSQL", level: 92, type: "LANG" },
  { category: "quality", name: "Great Expectations", level: 85, type: "DQ" },
  { category: "devops", name: "Terraform / Docker", level: 80, type: "DEVOPS" },
  { category: "devops", name: "GitHub Actions", level: 82, type: "DEVOPS" },
];

const PIPELINE_STEPS = [
  { id: "ingest", label: "ingest_raw()", status: "done", ms: 142 },
  { id: "validate", label: "validate_schema()", status: "done", ms: 38 },
  { id: "transform", label: "transform_silver()", status: "done", ms: 891 },
  { id: "enrich", label: "enrich_gold()", status: "running", ms: null },
  { id: "publish", label: "publish_mart()", status: "pending", ms: null },
];

function Progressbar({ value }) {
  return (
    <div className="pbar">
      <div className="pbar__fill" style={{ width: `${value}%` }} />
      <span className="pbar__val">{value}%</span>
    </div>
  );
}

function TypedText({ text, delay = 0 }) {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    let i = 0;
    const t = setTimeout(() => {
      const iv = setInterval(() => {
        setDisplayed(text.slice(0, ++i));
        if (i >= text.length) clearInterval(iv);
      }, 28);
      return () => clearInterval(iv);
    }, delay);
    return () => clearTimeout(t);
  }, [text, delay]);
  return <span>{displayed}</span>;
}

function Home({ setPage }) {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const iv = setInterval(() => setTick((t) => t + 1), 1200);
    return () => clearInterval(iv);
  }, []);

  const runningStep = PIPELINE_STEPS.find((s) => s.status === "running");
  const progress = 40 + (tick % 50);

  return (
    <div className="page home-page">
      <div className="home-layout">
        {/* ── LEFT COLUMN ── */}
        <div className="home-left">
          {/* Hero terminal block */}
          <div className="panel hero-panel">
            <div className="panel-bar">
              <div className="panel-bar__dots">
                <div className="panel-bar__dot panel-bar__dot--red" />
                <div className="panel-bar__dot panel-bar__dot--amber" />
                <div className="panel-bar__dot panel-bar__dot--green" />
              </div>
              <span className="panel-bar__title">
                bash — aniruddha@dataeng: ~
              </span>
            </div>
            <div className="hero-terminal">
              <div className="hero-terminal__line">
                <span className="cmt">
                  # Welcome to my data engineering workspace
                </span>
              </div>
              <div className="hero-terminal__line hero-terminal__line--gap">
                <span className="kw">const</span>{" "}
                <span className="code">engineer</span> = {"{"}
                <br />
                &nbsp;&nbsp;<span className="str">"name"</span>:{" "}
                <span className="str">"Aniruddha Shinde"</span>,<br />
                &nbsp;&nbsp;<span className="str">"role"</span>:{" "}
                <span className="str">"Data Engineer"</span>,<br />
                &nbsp;&nbsp;<span className="str">"exp"</span>:{" "}
                <span className="num">"3+ years"</span>,<br />
                &nbsp;&nbsp;<span className="str">"stack"</span>: [
                <span className="str">"PySpark"</span>,{" "}
                <span className="str">"Databricks"</span>,{" "}
                <span className="str">"Delta Lake"</span>],
                <br />
                &nbsp;&nbsp;<span className="str">"location"</span>:{" "}
                <span className="str">"Pune, India"</span>,<br />
                &nbsp;&nbsp;<span className="str">"status"</span>:{" "}
                <span className="str gradient-text">"open_to_work"</span>
                <br />
                {"}"}
              </div>
              <div className="hero-terminal__line hero-terminal__line--gap">
                <span className="text3 cmt">$</span>{" "}
                <TypedText
                  text="python -c 'print(engineer.hire())'"
                  delay={600}
                />
                <span className="hero-cursor">▊</span>
              </div>
              <div className="hero-terminal__output">
                <span className="str">
                  → Building scalable data pipelines at cloud scale.
                </span>
              </div>

              <div className="hero-cta">
                <button
                  className="btn-primary"
                  onClick={() => setPage("schema")}
                >
                  view_resume()
                </button>
                <button
                  className="btn-secondary"
                  onClick={() => setPage("status")}
                >
                  get_contact()
                </button>
              </div>
            </div>
          </div>

          {/* Stats row */}
          <div className="stats-row">
            {[
              { key: "experience", val: "3+", unit: "years", label: "EXP" },
              { key: "cgpa", val: "9.32", unit: "/ 10.0", label: "CGPA" },
              {
                key: "pipelines",
                val: "50+",
                unit: "pipelines",
                label: "BUILT",
              },
              { key: "uptime", val: "99.9", unit: "% SLA", label: "TARGET" },
            ].map((s) => (
              <div key={s.key} className="panel stat-card">
                <div className="stat-card__label">{s.label}</div>
                <div className="stat-card__val">
                  {s.val}
                  <span className="stat-card__unit"> {s.unit}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Skills table */}
          <div className="panel">
            <div className="panel-bar">
              <div className="panel-bar__dots">
                <div className="panel-bar__dot panel-bar__dot--red" />
                <div className="panel-bar__dot panel-bar__dot--amber" />
                <div className="panel-bar__dot panel-bar__dot--green" />
              </div>
              <span className="panel-bar__title">
                skills.parquet — row count: {SKILLS_TABLE.length}
              </span>
              <span
                className="panel-bar-tag badge badge--cyan"
                style={{ marginLeft: "auto" }}
              >
                DELTA TABLE
              </span>
            </div>
            <table className="data-table">
              <thead>
                <tr>
                  <th>SKILL_NAME</th>
                  <th>TYPE</th>
                  <th>PROFICIENCY</th>
                  <th>LEVEL</th>
                </tr>
              </thead>
              <tbody>
                {SKILLS_TABLE.map((s, i) => (
                  <tr key={i}>
                    <td>
                      <span className="code">{s.name}</span>
                    </td>
                    <td>
                      <span
                        className={`badge badge--${s.type === "LANG" ? "amber" : s.type === "CLOUD" ? "cyan" : "green"}`}
                      >
                        {s.type}
                      </span>
                    </td>
                    <td>
                      <Progressbar value={s.level} />
                    </td>
                    <td style={{ color: "var(--text3)", fontSize: "0.65rem" }}>
                      {s.level}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── RIGHT COLUMN ── */}
        <div className="home-right">
          {/* Profile card */}
          <div className="panel profile-panel">
            <div className="panel-bar">
              <div className="panel-bar__dots">
                <div className="panel-bar__dot panel-bar__dot--red" />
                <div className="panel-bar__dot panel-bar__dot--amber" />
                <div className="panel-bar__dot panel-bar__dot--green" />
              </div>
              <span className="panel-bar__title">profile.json</span>
            </div>
            <div className="profile-photo">
              <img
                src="/profile.jpg"
                alt="Aniruddha Shinde"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "top",
                }}
              />
            </div>
            <div className="profile-meta">
              <div className="profile-name">Aniruddha Shinde</div>
              <div className="profile-role">
                <span className="cmt">// </span>Data Engineer
              </div>
              <div className="profile-badges">
                <span className="badge badge--green">
                  <span className="status-dot status-dot--online" />
                  AVAILABLE
                </span>
                <span className="badge badge--cyan">PUNE, IN</span>
              </div>
            </div>
            <div className="profile-links">
              {[
                {
                  icon: "⌗",
                  label: "github",
                  val: "github.com/aniruddha",
                  href: "https://github.com/aniruddha",
                },
                {
                  icon: "◈",
                  label: "linkedin",
                  val: "linkedin.com/in/aniruddha",
                  href: "https://linkedin.com/in/aniruddha",
                },
                {
                  icon: "✉",
                  label: "email",
                  val: "aniruddhashinde2212@gmail.com",
                  href: "mailto:aniruddhashinde2212@gmail.com",
                },
                {
                  icon: "☏",
                  label: "phone",
                  val: "+91 7038182738",
                  href: "tel:+917038182738",
                },
              ].map((l) => (
                <a
                  key={l.label}
                  className="profile-link"
                  href={l.href}
                  target={l.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                >
                  <span className="profile-link__icon">{l.icon}</span>
                  <span className="profile-link__label">{l.label}:</span>
                  <span className="profile-link__val">{l.val}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Live pipeline widget */}
          <div className="panel pipeline-panel">
            <div className="panel-bar">
              <div className="panel-bar__dots">
                <div className="panel-bar__dot panel-bar__dot--red" />
                <div className="panel-bar__dot panel-bar__dot--amber" />
                <div className="panel-bar__dot panel-bar__dot--green" />
              </div>
              <span className="panel-bar__title">
                airflow_dag — etl_medallion_pipeline
              </span>
              <span
                className="badge badge--green"
                style={{ marginLeft: "auto" }}
              >
                LIVE
              </span>
            </div>
            <div className="pipeline-body">
              {PIPELINE_STEPS.map((step, i) => (
                <div
                  key={step.id}
                  className={`pipeline-step pipeline-step--${step.status}`}
                >
                  <div className="pipeline-step__connector">
                    {i < PIPELINE_STEPS.length - 1 && (
                      <div className="pipeline-step__line" />
                    )}
                  </div>
                  <div className="pipeline-step__dot" />
                  <div className="pipeline-step__content">
                    <span className="pipeline-step__name code">
                      {step.label}
                    </span>
                    {step.status === "done" && (
                      <span className="pipeline-step__ms">{step.ms}ms</span>
                    )}
                    {step.status === "running" && (
                      <div className="pipeline-step__bar">
                        <div
                          className="pipeline-step__bar-fill"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    )}
                    {step.status === "pending" && (
                      <span className="pipeline-step__pending">queued</span>
                    )}
                  </div>
                  <span
                    className={`badge badge--${step.status === "done" ? "green" : step.status === "running" ? "amber" : "red"}`}
                  >
                    {step.status.toUpperCase()}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Architecture block */}
          <div className="panel arch-panel">
            <div className="panel-bar">
              <div className="panel-bar__dots">
                <div className="panel-bar__dot panel-bar__dot--red" />
                <div className="panel-bar__dot panel-bar__dot--amber" />
                <div className="panel-bar__dot panel-bar__dot--green" />
              </div>
              <span className="panel-bar__title">
                architecture — medallion.yml
              </span>
            </div>
            <div className="arch-body">
              {[
                {
                  layer: "BRONZE",
                  desc: "Raw ingestion — Event Hubs / S3 / ADLS",
                  color: "#cd7c32",
                  tasks: "Streaming · Batch · Schema-on-read",
                },
                {
                  layer: "SILVER",
                  desc: "Cleansed & validated — Delta Lake",
                  color: "#9ca3af",
                  tasks: "Great Expectations · Data Contracts · DQ checks",
                },
                {
                  layer: "GOLD",
                  desc: "Curated business entities — Snowflake",
                  color: "#f59e0b",
                  tasks: "Aggregations · Feature Store · Power BI",
                },
              ].map((l) => (
                <div key={l.layer} className="arch-layer">
                  <div
                    className="arch-layer__badge"
                    style={{ borderColor: l.color, color: l.color }}
                  >
                    {l.layer}
                  </div>
                  <div className="arch-layer__body">
                    <div className="arch-layer__desc">{l.desc}</div>
                    <div className="arch-layer__tasks">{l.tasks}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
