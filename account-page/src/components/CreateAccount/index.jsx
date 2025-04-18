import { useState } from 'react';
import styles from './CreateAccount.module.css';

const CreateAccount = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});

  const getPasswordStrength = (password) => {
    if (!password) return { text: '', class: styles.weak };
    if (password.length < 8) return { text: 'Weak', class: styles.weak };
    
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    const strength = [hasUpperCase, hasLowerCase, hasNumbers, hasSpecial].filter(Boolean).length;
    
    switch(strength) {
      case 4: return { text: 'Very Strong', class: styles.veryStrong };
      case 3: return { text: 'Strong', class: styles.strong };
      case 2: return { text: 'Medium', class: styles.medium };
      default: return { text: 'Weak', class: styles.weak };
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'You must accept the terms and conditions';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      try {
        // Simulate API call
        console.log('Submitting:', formData);
        alert('Account created successfully!');
      } catch (err) {
        setErrors(prev => ({ ...prev, api: err.message }));
      }
    }
  };

  const passwordStrength = getPasswordStrength(formData.password);

  return (
    <div className={styles.container}>
      <h1 className={styles.startFree}>START FOR FREE</h1>
      <h2 className={styles.title}>Create Account</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First Name"
            className={`${styles.inputField} ${errors.firstName ? styles.error : ''}`}
          />
          {errors.firstName && <span className={styles.errorMessage}>{errors.firstName}</span>}
        </div>

        <div className={styles.formGroup}>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            className={`${styles.inputField} ${errors.lastName ? styles.error : ''}`}
          />
          {errors.lastName && <span className={styles.errorMessage}>{errors.lastName}</span>}
        </div>

        <div className={styles.formGroup}>
          <input
            type="text"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className={`${styles.inputField} ${errors.email ? styles.error : ''}`}
          />
          {errors.email && <span className={styles.errorMessage}>{errors.email}</span>}
        </div>
        
        <div className={styles.formGroup}>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className={`${styles.inputField} ${errors.password ? styles.error : ''}`}
          />
          {formData.password && (
            <div className={`${styles.passwordStrength} ${passwordStrength.class}`}>
              Password Strength: {passwordStrength.text}
            </div>
          )}
          {errors.password && <span className={styles.errorMessage}>{errors.password}</span>}
        </div>

        <div className={styles.signInPrompt}>
          Already have an account? <a href="/login" className={styles.signInLink}>Sign in</a>
        </div>
        
        <button type="submit" className={styles.submitButton}>Create Account</button>
      </form>
    </div>
  );
};

export default CreateAccount;