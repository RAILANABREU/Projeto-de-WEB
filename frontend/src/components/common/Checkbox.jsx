import { useState } from "react"
import styles from './Checkbox.module.css'

function Checkbox({text, onCheckboxChange}) {
    const [isChecked, setIsChecked] = useState(false);
  
    const handleLocalCheckboxChange = (event) => {
      setIsChecked(event.target.checked);

      // Chama a função de callback do componente pai
      if (onCheckboxChange) {
        onCheckboxChange(event.target.checked);
      }
    };
  
    return (
      <div>
        <label className={styles['label-checkbox']}>
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleLocalCheckboxChange}
          />
          {text}
        </label>
      </div>
    );
  }

  export default Checkbox