import { useState } from "react"
import styles from './Checkbox.module.css'

function Checkbox({text}) {
    const [isChecked, setIsChecked] = useState(false);
  
    const handleCheckboxChange = (event) => {
      setIsChecked(event.target.checked);
    };
  
    return (
      <div>
        <label className={styles['label-checkbox']}>
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
          {text}
        </label>
      </div>
    );
  }

  export default Checkbox