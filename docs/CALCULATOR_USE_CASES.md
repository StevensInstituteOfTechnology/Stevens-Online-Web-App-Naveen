# Discount Calculator Use Cases

## Current Implementation Logic

**Stacking Method**: Sequential/Compound Stacking
- Each discount is calculated based on the price after the previous discount
- Formula: `Final Price = Base × (1 - d1) × (1 - d2) × ...`

**Discount Priority**:
1. Special Cohort Pricing (if applicable, excludes all other discounts)
2. CPE 30% Retail Discount (only if no cohort)
3. Stackable Discounts: Hoboken 5% → Alumni 5% (sequential)
4. Employer Reimbursement (always last, user input)

---

## Use Case 1: Pfizer Employee + MBA (Special Cohort)

**Inputs**:
- Program: Online MBA
- Company: Pfizer
- Hoboken Resident: ❌
- Alumni: ❌
- CPE 30%: ❌ (not shown/not applicable)
- Employer Reimbursement: $10,500

**Calculation**:
```
Base Price: $86,695
  ↓
Pfizer Cohort Pricing: $666.66 × 42 credits (typical) = $28,000
  → $28,000 (cohort price)
  ↓
Employer Reimbursement: -$10,500
  → $17,500 (Final)
```

**Result**:
- ✅ Shows cohort pricing table (39-48 credits range)
- ❌ No CPE 30% discount (excluded for cohorts)
- ❌ No Hoboken/Alumni (excluded for cohorts)
- 💰 Final Cost: **$17,500** (based on 42 credits)
- 💾 Savings: 80%

---

## Use Case 2: Pfizer Employee + MEADS (Special Cohort)

**Inputs**:
- Program: M.Eng. Applied Data Science
- Company: Pfizer
- Hoboken Resident: ❌
- Alumni: ❌
- CPE 30%: ❌ (not shown/not applicable)
- Employer Reimbursement: $10,500

**Calculation**:
```
Base Price: $24,000
  ↓
Pfizer Cohort Pricing: $555 × 30 credits = $16,650
  → $16,650 (cohort price)
  ↓
Employer Reimbursement: -$10,500
  → $6,150 (Final)
```

**Result**:
- ✅ Shows fixed cohort pricing ($555/credit)
- ❌ No CPE 30% discount (excluded for cohorts + MEADS)
- ❌ No Hoboken/Alumni (excluded for cohorts)
- 💰 Final Cost: **$6,150**
- 💾 Savings: 74%

---

## Use Case 3: JPMorgan Employee + MSCS + All Discounts

**Inputs**:
- Program: M.S. Computer Science
- Company: JPMorgan Chase
- Hoboken Resident: ✅
- Alumni: ✅
- CPE 30%: ✅ (default checked)
- Employer Reimbursement: $10,500

**Calculation**:
```
Base Price: $53,082
  ↓
CPE 30% Discount: -$15,925 (30% of $53,082)
  → $37,157
  ↓
Hoboken 5%: -$1,858 (5% of $37,157)
  → $35,299
  ↓
Alumni 5%: -$1,765 (5% of $35,299)
  → $33,534
  ↓
Employer Reimbursement: -$10,500
  → $23,034 (Final)
```

**Result**:
- ✅ CPE 30% applied first
- ✅ Hoboken 5% applied sequentially
- ✅ Alumni 5% applied sequentially
- 💰 Final Cost: **$23,034**
- 💾 Savings: 57%

---

## Use Case 4: Individual Student + MBA + All Discounts

**Inputs**:
- Program: Online MBA
- Company: "I'm not from a partner company"
- Hoboken Resident: ✅
- Alumni: ✅
- CPE 30%: ✅ (default checked)
- Employer Reimbursement: $10,500

**Calculation**:
```
Base Price: $86,695
  ↓
CPE 30% Discount: -$26,009 (30% of $86,695)
  → $60,686
  ↓
Hoboken 5%: -$3,034 (5% of $60,686)
  → $57,652
  ↓
Alumni 5%: -$2,883 (5% of $57,652)
  → $54,769
  ↓
Employer Reimbursement: -$10,500
  → $44,269 (Final)
```

**Result**:
- ✅ Shows variable credit range: $39,769 - $50,769 (39-48 credits)
- ✅ Based on typical 42 credits: **$44,269**
- 💾 Savings: 49%

---

## Use Case 5: JPMorgan Employee + MEADS (No 30% Discount)

**Inputs**:
- Program: M.Eng. Applied Data Science
- Company: JPMorgan Chase
- Hoboken Resident: ✅
- Alumni: ✅
- CPE 30%: ❌ (not shown - MEADS excluded)
- Employer Reimbursement: $10,500

**Calculation**:
```
Base Price: $24,000
  ↓
CPE 30% Discount: ❌ (MEADS excluded)
  → $24,000
  ↓
Hoboken 5%: -$1,200 (5% of $24,000)
  → $22,800
  ↓
Alumni 5%: -$1,140 (5% of $22,800)
  → $21,660
  ↓
Employer Reimbursement: -$10,500
  → $11,160 (Final)
```

**Result**:
- ❌ CPE 30% not available (MEADS excluded)
- ✅ Hoboken 5% applied
- ✅ Alumni 5% applied sequentially
- 💰 Final Cost: **$11,160**
- 💾 Savings: 54%

---

## Use Case 6: Individual Student + Certificate + Reimbursement

**Inputs**:
- Program: Enterprise AI Certificate
- Company: "I'm not from a partner company"
- Hoboken Resident: ❌
- Alumni: ❌
- CPE 30%: ❌ (not shown - certificates excluded)
- Employer Reimbursement: $5,250

**Calculation**:
```
Base Price: $5,250
  ↓
CPE 30% Discount: ❌ (certificates excluded)
  → $5,250
  ↓
Hoboken/Alumni: ❌ (certificates excluded)
  → $5,250
  ↓
Employer Reimbursement: -$5,250
  → $0 (Final)
```

**Result**:
- ❌ No discounts available (certificates have fixed pricing)
- ✅ Shows certificate benefits message
- ✅ Fully covered by employer reimbursement
- 💰 Final Cost: **$0**
- 💾 Savings: 100%

---

## Use Case 7: JPMorgan Employee + MBA (No CPE 30%, Only Stackable)

**Inputs**:
- Program: Online MBA
- Company: JPMorgan Chase
- Hoboken Resident: ✅
- Alumni: ✅
- CPE 30%: ❌ (user unchecked)
- Employer Reimbursement: $10,500

**Calculation**:
```
Base Price: $86,695
  ↓
CPE 30% Discount: ❌ (user unchecked)
  → $86,695
  ↓
Hoboken 5%: -$4,335 (5% of $86,695)
  → $82,360
  ↓
Alumni 5%: -$4,118 (5% of $82,360)
  → $78,242
  ↓
Employer Reimbursement: -$10,500
  → $67,742 (Final)
```

**Result**:
- ❌ CPE 30% not applied (user unchecked)
- ✅ Hoboken 5% applied
- ✅ Alumni 5% applied sequentially
- 💰 Final Cost Range: **$61,242 - $72,242** (39-48 credits)
- 💰 Based on 42 credits: **$67,742**
- 💾 Savings: 22%

---

## Use Case 8: Individual Student + MEM + Only CPE 30%

**Inputs**:
- Program: M.Eng. Engineering Management
- Company: "I'm not from a partner company"
- Hoboken Resident: ❌
- Alumni: ❌
- CPE 30%: ✅ (default checked)
- Employer Reimbursement: $0

**Calculation**:
```
Base Price: $53,082
  ↓
CPE 30% Discount: -$15,925 (30% of $53,082)
  → $37,157
  ↓
Hoboken/Alumni: ❌ (not selected)
  → $37,157
  ↓
Employer Reimbursement: ❌ (not entered)
  → $37,157 (Final)
```

**Result**:
- ✅ Only CPE 30% applied
- 💰 Final Cost: **$37,157**
- 💾 Savings: 30%

---

## Key Rules Summary

### ✅ Special Cohort (Pfizer)
- **Applies**: Special per-credit pricing
- **Excludes**: All other discounts (CPE 30%, Hoboken, Alumni)
- **Programs**: MBA, MEADS only

### ✅ CPE 30% Retail Discount
- **Applies**: MSCS, MEM, MBA (non-cohort)
- **Excludes**: MEADS, Certificates, Special Cohorts
- **Date Range**: 2025-01-01 to 2026-12-25
- **Default**: Checked ✅

### ✅ Stackable Discounts (Sequential)
- **Hoboken 5%**: Applied first if selected
- **Alumni 5%**: Applied after Hoboken (if selected)
- **Formula**: Each discount based on previous price
- **Excludes**: Special Cohorts, Certificates

### ✅ Employer Reimbursement
- **Always Last**: Applied after all discounts
- **User Input**: Required manual entry
- **No Limit**: Can cover full cost (certificates often $0)

### 📊 Variable Credit Programs (MBA)
- **Range Display**: Shows min-max cost range
- **Typical Calculation**: Based on 42 credits
- **Cohort Pricing**: Embedded pricing table for Pfizer

---

## Calculator Features

1. **Dynamic Discount Visibility**: Options shown/hidden based on program and company
2. **Real-time Calculation**: Updates as user changes inputs
3. **Visual Breakdown**: Step-by-step discount display
4. **Variable Credit Support**: Range display for MBA
5. **Cohort Pricing Tables**: Embedded pricing for special cohorts
6. **Certificate Benefits**: Special messaging for certificates

