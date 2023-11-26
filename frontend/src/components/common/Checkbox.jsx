import { useState, forwardRef, useImperativeHandle } from "react";
import styles from './Checkbox.module.css'

const Checkbox = forwardRef(({text, onCheckboxChange }, ref) => {
    const [isChecked, setIsChecked] = useState(false);
  
    const handleLocalCheckboxChange = (event) => {
      setIsChecked(event.target.checked);

      // Chama a função de callback do componente pai
      if (onCheckboxChange) {
        onCheckboxChange(event.target.checked);
      }
    };
    useImperativeHandle(ref, () => ({
      isChecked: isChecked,
    }));
  
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
  })

  export default Checkbox;