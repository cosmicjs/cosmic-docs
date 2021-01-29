
import styles from './features.module.css'

export default () => (
  <div>
    <p className="text-lg mb-2 text-gray-600 md:text-xl">Content API and developer toolkit</p>
    <div className={styles.features}>
      <div className={styles.feature}>
        <img className="w-12 h-12" src="https://cdn.cosmicjs.com/6174d730-898e-11ea-9edc-335682595c41-cubes.svg"/>&nbsp;&nbsp;
        <h4>Composable</h4>
      </div>
      <div className={styles.feature}>
        <img className="w-12 h-12" src="https://cdn.cosmicjs.com/50f3c410-25c1-11ea-a865-1b8d71835f52-009-stem-cells.svg"/>&nbsp;&nbsp;
        <h4>Powerful modeling</h4>
      </div>
      <div className={styles.feature}>
        <img className="w-12 h-12" src="https://cdn.cosmicjs.com/9a0e1560-3007-11ea-a774-fd983bfe489d-071-screwdriver.svg"/>&nbsp;&nbsp;
        <h4>Extensive tooling</h4>
      </div>
      <div className={styles.feature}>
        <img className="w-12 h-12" src="https://cdn.cosmicjs.com/fa4b67e0-33e3-11ea-9530-5d76cd173054-112-layers.svg"/>&nbsp;&nbsp;
        <h4>Jamstack ready</h4>
      </div>
      <div className={styles.feature}>
        <img className="w-12 h-12" src="https://cdn.cosmicjs.com/8d4f0b40-33e0-11ea-ad16-3d7209450571-security.svg"/>&nbsp;&nbsp;
        <h4>Secure</h4>
      </div>
      <div className={styles.feature}>
        <img className="w-12 h-12" src="https://cdn.cosmicjs.com/559dad30-6574-11ea-8882-7f56d1a66c15-048-profit.svg"/>&nbsp;&nbsp;
        <h4>Scalable</h4>
      </div>
    </div>
  </div>
)
