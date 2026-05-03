import './Schema.css'

const EXPERIENCE = [
  {
    table: 'work_experience',
    role: 'Data Engineer',
    org: 'Cloud Data Platform Engineering',
    period: '2021-01-01 → present',
    yoe: '3+ yrs',
    highlights: [
      'Designed Medallion Architecture (Bronze→Silver→Gold) ETL/ELT pipelines on Azure Databricks using PySpark',
      'Built real-time streaming via Azure Event Hubs (Kafka) + Airflow for batch — achieved 99.9% SLA',
      'Spark performance tuning: partitioning, broadcast joins, AQE — cut runtime by ~60% on critical jobs',
      'Great Expectations + Data Contracts + Unity Catalog RBAC for full data quality & governance layer',
      'Provisioned cloud infra with Terraform + Docker; CI/CD via GitHub Actions GitOps workflows',
    ],
    tags: ['PySpark', 'Databricks', 'Delta Lake', 'Airflow', 'Terraform'],
  },
]

const EDUCATION = {
  institution: 'Pimpri Chinchwad College of Engineering',
  degree: 'BE — Electronics & Telecommunications',
  period: '2019-08-01 → 2023-06-30',
  cgpa: 9.32,
  location: 'Pune, India',
}

const SCHEMA_COLS = [
  { name: 'skill_name',    type: 'STRING',  nullable: false },
  { name: 'category',     type: 'STRING',  nullable: false },
  { name: 'proficiency',  type: 'INT',     nullable: false },
  { name: 'years_used',   type: 'FLOAT',   nullable: true  },
  { name: 'is_primary',   type: 'BOOLEAN', nullable: false },
]

const SKILLS_DATA = [
  { skill_name: 'PySpark',           category: 'big_data',     proficiency: 95, years_used: 3.0, is_primary: true  },
  { skill_name: 'Azure Databricks',  category: 'platform',     proficiency: 92, years_used: 2.5, is_primary: true  },
  { skill_name: 'Delta Lake',        category: 'storage',      proficiency: 90, years_used: 2.5, is_primary: true  },
  { skill_name: 'Apache Airflow',    category: 'orchestration',proficiency: 88, years_used: 2.0, is_primary: true  },
  { skill_name: 'Python',            category: 'language',     proficiency: 95, years_used: 4.0, is_primary: true  },
  { skill_name: 'SQL / SparkSQL',    category: 'language',     proficiency: 92, years_used: 3.5, is_primary: true  },
  { skill_name: 'Azure ADF',         category: 'orchestration',proficiency: 85, years_used: 2.0, is_primary: false },
  { skill_name: 'AWS S3/Glue/ECS',   category: 'cloud',        proficiency: 80, years_used: 1.5, is_primary: false },
  { skill_name: 'Great Expectations',category: 'data_quality', proficiency: 85, years_used: 2.0, is_primary: false },
  { skill_name: 'Terraform',         category: 'devops',       proficiency: 80, years_used: 1.5, is_primary: false },
  { skill_name: 'Docker',            category: 'devops',       proficiency: 82, years_used: 2.0, is_primary: false },
  { skill_name: 'GitHub Actions',    category: 'devops',       proficiency: 82, years_used: 2.0, is_primary: false },
  { skill_name: 'Snowflake',         category: 'warehouse',    proficiency: 78, years_used: 1.0, is_primary: false },
  { skill_name: 'Power BI',          category: 'bi',           proficiency: 72, years_used: 1.5, is_primary: false },
  { skill_name: 'FastAPI',           category: 'backend',      proficiency: 75, years_used: 1.0, is_primary: false },
]

function Schema() {
  return (
    <div className="page schema-page">
      <div className="section">

        {/* Breadcrumb */}
        <div className="schema-breadcrumb">
          <span className="cmt">catalog</span>
          <span className="text3"> / </span>
          <span className="cmt">prod_db</span>
          <span className="text3"> / </span>
          <span className="code">resume_schema</span>
        </div>

        <div className="schema-layout">

          {/* Left: main content */}
          <div className="schema-main">

            {/* Experience */}
            <div className="panel">
              <div className="panel-bar">
                <div className="panel-bar__dots">
                  <div className="panel-bar__dot panel-bar__dot--red" />
                  <div className="panel-bar__dot panel-bar__dot--amber" />
                  <div className="panel-bar__dot panel-bar__dot--green" />
                </div>
                <span className="panel-bar__title">work_experience — 1 record</span>
                <span className="badge badge--green" style={{marginLeft:'auto'}}>CURRENT</span>
              </div>
              {EXPERIENCE.map((exp, i) => (
                <div key={i} className="exp-block">
                  <div className="exp-header">
                    <div>
                      <div className="exp-role"><span className="kw">SELECT</span> * <span className="kw">FROM</span> <span className="code">{exp.table}</span></div>
                      <div className="exp-title">{exp.role}</div>
                      <div className="exp-org">{exp.org}</div>
                    </div>
                    <div className="exp-meta">
                      <div className="exp-period code">{exp.period}</div>
                      <div className="exp-yoe badge badge--amber">{exp.yoe}</div>
                    </div>
                  </div>
                  <div className="exp-highlights">
                    {exp.highlights.map((h, j) => (
                      <div key={j} className="exp-highlight">
                        <span className="exp-highlight__arrow">→</span>
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                  <div className="exp-tags">
                    {exp.tags.map((t, j) => (
                      <span key={j} className="badge badge--cyan">{t}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Skills Table */}
            <div className="panel">
              <div className="panel-bar">
                <div className="panel-bar__dots">
                  <div className="panel-bar__dot panel-bar__dot--red" />
                  <div className="panel-bar__dot panel-bar__dot--amber" />
                  <div className="panel-bar__dot panel-bar__dot--green" />
                </div>
                <span className="panel-bar__title">skills — {SKILLS_DATA.length} rows · DELTA format</span>
              </div>
              {/* Schema */}
              <div className="table-schema">
                <div className="table-schema__title cmt">-- table schema</div>
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>COLUMN_NAME</th>
                      <th>DATA_TYPE</th>
                      <th>NULLABLE</th>
                    </tr>
                  </thead>
                  <tbody>
                    {SCHEMA_COLS.map((c, i) => (
                      <tr key={i}>
                        <td><span className="code">{c.name}</span></td>
                        <td><span className="kw">{c.type}</span></td>
                        <td><span className={c.nullable ? 'text2' : 'str'}>{c.nullable ? 'YES' : 'NO'}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* Data */}
              <table className="data-table">
                <thead>
                  <tr>
                    <th>SKILL_NAME</th>
                    <th>CATEGORY</th>
                    <th>PROFICIENCY</th>
                    <th>YRS</th>
                    <th>PRIMARY</th>
                  </tr>
                </thead>
                <tbody>
                  {SKILLS_DATA.map((s, i) => (
                    <tr key={i}>
                      <td><span className="code">{s.skill_name}</span></td>
                      <td><span className="str">{s.category}</span></td>
                      <td>
                        <div style={{display:'flex',alignItems:'center',gap:'0.4rem'}}>
                          <div style={{width:`${s.proficiency * 0.6}px`,height:'3px',background:'var(--green)',borderRadius:'2px'}} />
                          <span style={{color:'var(--text3)',fontSize:'0.65rem'}}>{s.proficiency}</span>
                        </div>
                      </td>
                      <td style={{color:'var(--num, #c084fc)'}}>{s.years_used}</td>
                      <td><span className={`badge badge--${s.is_primary ? 'green' : 'red'}`}>{s.is_primary ? 'TRUE' : 'FALSE'}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right: sidebar */}
          <div className="schema-sidebar">

            {/* Summary card */}
            <div className="panel">
              <div className="panel-bar">
                <div className="panel-bar__dots">
                  <div className="panel-bar__dot panel-bar__dot--red" />
                  <div className="panel-bar__dot panel-bar__dot--amber" />
                  <div className="panel-bar__dot panel-bar__dot--green" />
                </div>
                <span className="panel-bar__title">DESCRIBE engineer</span>
              </div>
              <div className="sidebar-kv">
                {[
                  { k: 'name',       v: 'Aniruddha Shinde',    c: 'str'  },
                  { k: 'role',       v: 'Data Engineer',        c: 'str'  },
                  { k: 'exp_years',  v: '3.0',                  c: 'num'  },
                  { k: 'cgpa',       v: '9.32',                 c: 'num'  },
                  { k: 'location',   v: 'Pune, IN',             c: 'str'  },
                  { k: 'remote_ok',  v: 'true',                 c: 'bool' },
                  { k: 'status',     v: 'open_to_work',         c: 'str'  },
                ].map(({ k, v, c }) => (
                  <div key={k} className="sidebar-kv__row">
                    <span className="sidebar-kv__key">{k}</span>
                    <span className={`sidebar-kv__val ${c === 'str' ? 'str' : c === 'num' ? 'num' : 'kw'}`}>
                      {c === 'str' ? `"${v}"` : v}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="panel">
              <div className="panel-bar">
                <div className="panel-bar__dots">
                  <div className="panel-bar__dot panel-bar__dot--red" />
                  <div className="panel-bar__dot panel-bar__dot--amber" />
                  <div className="panel-bar__dot panel-bar__dot--green" />
                </div>
                <span className="panel-bar__title">education.json</span>
              </div>
              <div className="edu-block">
                <div className="edu-field"><span className="cmt">institution</span></div>
                <div className="edu-val">{EDUCATION.institution}</div>
                <div className="edu-field" style={{marginTop:'0.5rem'}}><span className="cmt">degree</span></div>
                <div className="edu-val code">{EDUCATION.degree}</div>
                <div className="edu-field" style={{marginTop:'0.5rem'}}><span className="cmt">period</span></div>
                <div className="edu-val" style={{color:'var(--text2)'}}>{EDUCATION.period}</div>
                <div className="edu-cgpa">
                  <span className="cmt">cgpa: </span>
                  <span className="num" style={{fontSize:'1.1rem',fontWeight:700}}>{EDUCATION.cgpa}</span>
                  <span className="text3"> / 10.0</span>
                </div>
              </div>
            </div>

            {/* Download button */}
            <button className="btn-primary schema-download" onClick={() => window.print()}>
              export_resume_pdf()
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Schema
