import './StatusBar.css'

function StatusBar() {
  return (
    <div className="statusbar">
      <div className="statusbar__left">
        <span className="statusbar__item statusbar__item--green">
          <span className="status-dot status-dot--online" />
          PIPELINE: RUNNING
        </span>
        <span className="statusbar__sep">│</span>
        <span className="statusbar__item">BRANCH: main</span>
        <span className="statusbar__sep">│</span>
        <span className="statusbar__item">ENV: production</span>
      </div>
      <div className="statusbar__right">
        <span className="statusbar__item">PySpark 3.5</span>
        <span className="statusbar__sep">│</span>
        <span className="statusbar__item">Databricks</span>
        <span className="statusbar__sep">│</span>
        <span className="statusbar__item statusbar__item--green">● UTF-8</span>
      </div>
    </div>
  )
}

export default StatusBar
