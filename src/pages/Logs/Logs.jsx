import { useState, useEffect, useRef } from 'react'
import './Logs.css'

const LOG_ENTRIES = [
  { ts: '2019-08-01 09:00:01', level: 'INFO',  pid: 1001, msg: 'Enrolled: BE Electronics & Telecommunications @ PCCOE Pune' },
  { ts: '2020-03-15 10:22:44', level: 'INFO',  pid: 1001, msg: 'Completed coursework in DSP, Embedded Systems, and Engineering Mathematics' },
  { ts: '2021-06-01 09:00:00', level: 'INFO',  pid: 2001, msg: 'Career init: first data engineering role — ingesting raw data into cloud storage' },
  { ts: '2021-08-14 14:33:21', level: 'INFO',  pid: 2001, msg: 'Shipped first PySpark ETL pipeline — 5M rows/day Bronze→Silver' },
  { ts: '2021-10-03 11:14:55', level: 'DEBUG', pid: 2001, msg: 'Investigating data skew on join partition — resolved with salting technique' },
  { ts: '2022-01-10 08:55:33', level: 'INFO',  pid: 2001, msg: 'Migrated batch pipelines to Medallion Architecture on Azure Databricks' },
  { ts: '2022-03-22 16:02:10', level: 'WARN',  pid: 2001, msg: 'Pipeline SLA breach detected — initiating Spark AQE + broadcast join optimisation' },
  { ts: '2022-03-22 16:45:00', level: 'INFO',  pid: 2001, msg: 'Spark tuning complete — runtime reduced by 62%. SLA restored ✓' },
  { ts: '2022-06-08 10:00:00', level: 'INFO',  pid: 2001, msg: 'Implemented Great Expectations DQ framework — 50+ data contracts enforced' },
  { ts: '2022-09-01 09:30:00', level: 'INFO',  pid: 2001, msg: 'Integrated Azure Event Hubs (Kafka) for real-time streaming ingestion' },
  { ts: '2022-12-05 14:00:00', level: 'INFO',  pid: 2001, msg: 'Deployed Unity Catalog with RBAC + lineage tracking across all Delta tables' },
  { ts: '2023-02-15 11:20:00', level: 'INFO',  pid: 2001, msg: 'Terraform IaC adopted — full cloud infra provisioned as code' },
  { ts: '2023-04-20 09:10:00', level: 'INFO',  pid: 2001, msg: 'GitHub Actions CI/CD pipeline live — zero-downtime deployments' },
  { ts: '2023-06-30 17:00:00', level: 'INFO',  pid: 1001, msg: 'Graduated PCCOE — BE Electronics & Telecom. CGPA: 9.32 / 10.0 🎓' },
  { ts: '2023-07-01 09:00:00', level: 'INFO',  pid: 2001, msg: 'Expanded to AWS stack — S3 / Glue / ECS data pipelines' },
  { ts: '2023-10-10 13:45:00', level: 'INFO',  pid: 2001, msg: 'Snowflake data mart built — Power BI dashboards connected for business users' },
  { ts: '2024-01-15 10:00:00', level: 'INFO',  pid: 2001, msg: 'Implemented FastAPI data service layer over Delta Lake for self-serve access' },
  { ts: '2024-06-01 09:00:00', level: 'INFO',  pid: 2001, msg: 'Cross-functional collaboration: partnered with ML team on feature engineering pipeline' },
  { ts: '2025-01-01 00:00:00', level: 'INFO',  pid: 2001, msg: 'Year 4 init — continuing to scale data infrastructure at enterprise level' },
  { ts: '2025-05-01 08:30:00', level: 'INFO',  pid: 9999, msg: 'STATUS: open_to_work = true — seeking next challenge in data engineering' },
]

const LEVEL_COLOR = {
  INFO:  'green',
  WARN:  'amber',
  ERROR: 'red',
  DEBUG: 'cyan',
}

function Logs() {
  const [filter, setFilter] = useState('ALL')
  const [search, setSearch] = useState('')
  const [streaming, setStreaming] = useState(false)
  const [streamLog, setStreamLog] = useState([])
  const bottomRef = useRef(null)

  const STREAM_MSGS = [
    'Spark executor heartbeat received',
    'Stage 14 completed — 2.1M records processed',
    'Delta table checkpoint written',
    'Schema validation passed — 0 violations',
    'Watermark advanced to 2025-05-01T08:30:00Z',
    'Micro-batch #4821 committed — latency: 340ms',
    'Unity Catalog lineage updated',
    'Partition pruning applied — 94% data skipped',
  ]

  useEffect(() => {
    if (!streaming) return
    const iv = setInterval(() => {
      const msg = STREAM_MSGS[Math.floor(Math.random() * STREAM_MSGS.length)]
      const ts = new Date().toISOString().replace('T', ' ').slice(0, 19)
      setStreamLog(l => [...l.slice(-30), { ts, level: 'INFO', msg }])
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, 900)
    return () => clearInterval(iv)
  }, [streaming])

  const filtered = LOG_ENTRIES.filter(e =>
    (filter === 'ALL' || e.level === filter) &&
    (search === '' || e.msg.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <div className="page logs-page">
      <div className="section">

        <div className="logs-breadcrumb">
          <span className="cmt">journalctl</span>
          <span className="text3"> --unit=</span>
          <span className="code">aniruddha.dataeng</span>
          <span className="text3"> --since=</span>
          <span className="str">"2019-08-01"</span>
        </div>

        {/* Controls */}
        <div className="logs-controls panel">
          <div className="logs-controls__filters">
            {['ALL', 'INFO', 'WARN', 'DEBUG'].map(f => (
              <button
                key={f}
                className={`logs-filter-btn${filter === f ? ' logs-filter-btn--active' : ''}`}
                onClick={() => setFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>
          <input
            className="logs-search"
            placeholder="grep -i '...'"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <button
            className={`btn-primary logs-stream-btn${streaming ? ' logs-stream-btn--active' : ''}`}
            onClick={() => setStreaming(s => !s)}
          >
            {streaming ? 'stop_stream()' : 'tail_live()'}
          </button>
          <span className="logs-count">{filtered.length} entries</span>
        </div>

        {/* Log output */}
        <div className="panel logs-panel">
          <div className="panel-bar">
            <div className="panel-bar__dots">
              <div className="panel-bar__dot panel-bar__dot--red" />
              <div className="panel-bar__dot panel-bar__dot--amber" />
              <div className="panel-bar__dot panel-bar__dot--green" />
            </div>
            <span className="panel-bar__title">career.log — {LOG_ENTRIES.length} total entries</span>
            {streaming && <span className="badge badge--amber" style={{marginLeft:'auto'}}>● STREAMING</span>}
          </div>
          <div className="logs-output">
            {filtered.map((e, i) => (
              <div key={i} className={`log-line log-line--${LEVEL_COLOR[e.level]}`}>
                <span className="log-ts">{e.ts}</span>
                <span className={`log-level log-level--${LEVEL_COLOR[e.level]}`}>[{e.level.padEnd(5)}]</span>
                <span className="log-pid cmt">pid={e.pid}</span>
                <span className="log-msg">{e.msg}</span>
              </div>
            ))}
            {streamLog.map((e, i) => (
              <div key={`s${i}`} className="log-line log-line--green log-line--stream">
                <span className="log-ts">{e.ts}</span>
                <span className="log-level log-level--green">[LIVE ]</span>
                <span className="log-pid cmt">pid=2001</span>
                <span className="log-msg">{e.msg}</span>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>
        </div>

        {/* About / bio panel */}
        <div className="about-panels">
          <div className="panel about-bio-panel">
            <div className="panel-bar">
              <div className="panel-bar__dots">
                <div className="panel-bar__dot panel-bar__dot--red" />
                <div className="panel-bar__dot panel-bar__dot--amber" />
                <div className="panel-bar__dot panel-bar__dot--green" />
              </div>
              <span className="panel-bar__title">cat bio.md</span>
            </div>
            <div className="about-bio">
              <p><span className="cmt">## </span><span className="gradient-text">Who I Am</span></p>
              <p>Data Engineer with <span className="str">"3+ years"</span> of experience building and scaling enterprise data infrastructure. My work lives at the intersection of <span className="code">distributed_computing</span>, <span className="code">cloud_platforms</span>, and engineering discipline.</p>
              <p>Daily tools: <span className="badge badge--green">PySpark</span> <span className="badge badge--cyan">Azure Databricks</span> <span className="badge badge--amber">Delta Lake</span> — designing Medallion Architecture data lakes handling everything from high-throughput batch ingestion to real-time streaming.</p>
              <p>Beyond pipelines: I care deeply about <span className="code">data_quality</span> and governance — Great Expectations, data contracts, schema enforcement — because <span className="str">"good data is the foundation of good decisions"</span>.</p>
            </div>
          </div>

          <div className="panel about-stack-panel">
            <div className="panel-bar">
              <div className="panel-bar__dots">
                <div className="panel-bar__dot panel-bar__dot--red" />
                <div className="panel-bar__dot panel-bar__dot--amber" />
                <div className="panel-bar__dot panel-bar__dot--green" />
              </div>
              <span className="panel-bar__title">engineer.profile()</span>
            </div>
            <div className="profile-output">
              <div className="profile-output__line"><span className="kw">class</span> <span className="code">AniruddhaShinde</span>(<span className="str">DataEngineer</span>):</div>
              <div className="profile-output__block">
                <div><span className="kw">  def</span> <span className="code">__init__</span>(self):</div>
                <div>    self.name = <span className="str">"Aniruddha Shinde"</span></div>
                <div>    self.exp  = <span className="num">3.0</span> <span className="cmt"># years</span></div>
                <div>    self.cgpa = <span className="num">9.32</span></div>
                <div>    self.open_to_work = <span className="kw">True</span></div>
                <div>    self.stack = [</div>
                <div>      <span className="str">"PySpark"</span>, <span className="str">"Databricks"</span>,</div>
                <div>      <span className="str">"Delta Lake"</span>, <span className="str">"Airflow"</span>,</div>
                <div>      <span className="str">"Azure"</span>, <span className="str">"AWS"</span></div>
                <div>    ]</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Logs
