import { useState } from 'react'
import './Status.css'

const METRICS = [
  { key: 'pipelines_delivered', val: '50+',  unit: 'pipelines', status: 'healthy' },
  { key: 'data_processed_daily', val: '10B+',unit: 'rows/day',  status: 'healthy' },
  { key: 'pipeline_uptime',      val: '99.9',unit: '% SLA',     status: 'healthy' },
  { key: 'open_to_work',         val: 'TRUE',unit: '',          status: 'healthy' },
]

const ENDPOINTS = [
  { method: 'GET', path: '/api/contact/email',   response: 'aniruddhashinde2212@gmail.com', status: 200 },
  { method: 'GET', path: '/api/contact/phone',   response: '+91 7038182738',                status: 200 },
  { method: 'GET', path: '/api/social/linkedin', response: 'linkedin.com/in/aniruddha',     status: 200 },
  { method: 'GET', path: '/api/social/github',   response: 'github.com/aniruddha',          status: 200 },
  { method: 'GET', path: '/api/location',        response: 'Pune, Maharashtra, India',       status: 200 },
]

function Status() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', body: '' })
  const [sent, setSent] = useState(false)
  const [activeEndpoint, setActiveEndpoint] = useState(null)

  const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }))
  const handleSubmit = () => {
    if (form.name && form.email && form.body) setSent(true)
  }

  return (
    <div className="page status-page">
      <div className="section">

        <div className="status-breadcrumb">
          <span className="cmt">curl</span>
          <span className="text3"> -X GET </span>
          <span className="str">https://aniruddha.dataeng/status</span>
        </div>

        {/* Health checks */}
        <div className="panel status-health-panel">
          <div className="panel-bar">
            <div className="panel-bar__dots">
              <div className="panel-bar__dot panel-bar__dot--red" />
              <div className="panel-bar__dot panel-bar__dot--amber" />
              <div className="panel-bar__dot panel-bar__dot--green" />
            </div>
            <span className="panel-bar__title">GET /health — 200 OK</span>
            <span className="badge badge--green" style={{marginLeft:'auto'}}><span className="status-dot status-dot--online" />ALL SYSTEMS OPERATIONAL</span>
          </div>
          <div className="health-grid">
            {METRICS.map(m => (
              <div key={m.key} className="health-card">
                <div className="health-card__key cmt">{m.key}</div>
                <div className="health-card__val">
                  {m.val}<span className="health-card__unit"> {m.unit}</span>
                </div>
                <div className="health-card__status badge badge--green">
                  <span className="status-dot status-dot--online" />HEALTHY
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="status-layout">

          {/* API Explorer */}
          <div className="status-left">
            <div className="panel">
              <div className="panel-bar">
                <div className="panel-bar__dots">
                  <div className="panel-bar__dot panel-bar__dot--red" />
                  <div className="panel-bar__dot panel-bar__dot--amber" />
                  <div className="panel-bar__dot panel-bar__dot--green" />
                </div>
                <span className="panel-bar__title">contact_api — REST endpoints</span>
              </div>
              <div className="api-explorer">
                {ENDPOINTS.map((ep, i) => (
                  <div
                    key={i}
                    className={`api-endpoint${activeEndpoint === i ? ' api-endpoint--active' : ''}`}
                    onClick={() => setActiveEndpoint(activeEndpoint === i ? null : i)}
                  >
                    <div className="api-endpoint__header">
                      <span className="api-method badge badge--green">{ep.method}</span>
                      <span className="api-path code">{ep.path}</span>
                      <span className="api-status badge badge--cyan">HTTP {ep.status}</span>
                    </div>
                    {activeEndpoint === i && (
                      <div className="api-response">
                        <div className="cmt">// Response body</div>
                        <div>{'{' }</div>
                        <div>  <span className="str">"status"</span>: <span className="num">{ep.status}</span>,</div>
                        <div>  <span className="str">"data"</span>: <span className="str">"{ep.response}"</span></div>
                        <div>{'}'}</div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* POST request form */}
            <div className="panel contact-form-panel">
              <div className="panel-bar">
                <div className="panel-bar__dots">
                  <div className="panel-bar__dot panel-bar__dot--red" />
                  <div className="panel-bar__dot panel-bar__dot--amber" />
                  <div className="panel-bar__dot panel-bar__dot--green" />
                </div>
                <span className="panel-bar__title">POST /api/message — send request</span>
              </div>
              {sent ? (
                <div className="form-success">
                  <div className="form-success__code">
                    <span className="num">201</span> <span className="str">CREATED</span>
                  </div>
                  <div className="form-success__body">
                    <div>{'{'}</div>
                    <div>  <span className="str">"status"</span>: <span className="str">"message_queued"</span>,</div>
                    <div>  <span className="str">"eta"</span>: <span className="str">"within 24 hours"</span></div>
                    <div>{'}'}</div>
                  </div>
                  <button className="btn-secondary" onClick={() => setSent(false)}>send_another()</button>
                </div>
              ) : (
                <div className="contact-form">
                  <div className="cmt form-comment">// Fill request body fields below</div>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label"><span className="str">"name"</span>:</label>
                      <input className="form-input" name="name" value={form.name} onChange={handleChange} placeholder='"Your Name"' />
                    </div>
                    <div className="form-group">
                      <label className="form-label"><span className="str">"email"</span>:</label>
                      <input className="form-input" name="email" type="email" value={form.email} onChange={handleChange} placeholder='"you@company.com"' />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label"><span className="str">"subject"</span>:</label>
                    <input className="form-input" name="subject" value={form.subject} onChange={handleChange} placeholder='"Data Engineering Opportunity"' />
                  </div>
                  <div className="form-group">
                    <label className="form-label"><span className="str">"body"</span>:</label>
                    <textarea className="form-textarea" name="body" value={form.body} onChange={handleChange} placeholder='"Tell me about your project or opportunity..."' />
                  </div>
                  <button className="btn-primary form-submit" onClick={handleSubmit}>execute_request()</button>
                </div>
              )}
            </div>
          </div>

          {/* Right sidebar */}
          <div className="status-right">
            <div className="panel">
              <div className="panel-bar">
                <div className="panel-bar__dots">
                  <div className="panel-bar__dot panel-bar__dot--red" />
                  <div className="panel-bar__dot panel-bar__dot--amber" />
                  <div className="panel-bar__dot panel-bar__dot--green" />
                </div>
                <span className="panel-bar__title">engineer.status()</span>
              </div>
              <div className="status-info">
                <div className="status-info__block">
                  <div className="cmt">-- current state</div>
                  <div className="status-info__row">
                    <span className="text3">availability</span>
                    <span className="badge badge--green"><span className="status-dot status-dot--online" />OPEN</span>
                  </div>
                  <div className="status-info__row">
                    <span className="text3">remote_ok</span>
                    <span className="str">true</span>
                  </div>
                  <div className="status-info__row">
                    <span className="text3">relocation</span>
                    <span className="str">open</span>
                  </div>
                  <div className="status-info__row">
                    <span className="text3">notice_period</span>
                    <span className="amber">negotiable</span>
                  </div>
                </div>

                <div className="status-info__block">
                  <div className="cmt">-- preferred roles</div>
                  {['Data Engineer', 'Senior Data Engineer', 'Platform Engineer', 'MLOps Engineer'].map((r, i) => (
                    <div key={i} className="status-info__role">
                      <span className="green">✓</span> {r}
                    </div>
                  ))}
                </div>

                <div className="status-info__block">
                  <div className="cmt">-- direct links</div>
                  {[
                    { k: 'email',    v: 'aniruddhashinde2212\n@gmail.com', href: 'mailto:aniruddhashinde2212@gmail.com' },
                    { k: 'phone',    v: '+91 7038182738',        href: 'tel:+917038182738' },
                    { k: 'linkedin', v: 'linkedin.com/in/\naniruddha', href: 'https://linkedin.com/in/aniruddha' },
                    { k: 'github',   v: 'github.com/aniruddha',  href: 'https://github.com/aniruddha' },
                  ].map(l => (
                    <a key={l.k} className="status-link" href={l.href} target={l.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
                      <span className="text3">{l.k}:</span>
                      <span className="code">{l.v.replace('\n', '')}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Status
