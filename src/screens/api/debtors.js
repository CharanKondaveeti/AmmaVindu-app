import supabase from './supabase';

export async function getDebtors() {
  let {data, error} = await supabase.from('debtors').select('*');
    if (error) {
      throw new Error('customers could not be loaded');
    }
    return data;
}

export async function getDebtorDebts(debtorId) {
  let {data, error} = await supabase
    .from('debts')
    .select(
      `
    id,
    debtor_id,
    amount,
    description,
    debt_date,
    created_at,
    paid,
    debtors (
      name
    )
  `,
    )
    .eq('debtor_id', debtorId)
    .order('debt_date', {ascending: false})
    .order('created_at', {ascending: false});
  if (error) {
    throw new Error('customers could not be loaded');
  }
  console.log(data);
  return data;
}

export async function updateDebtorDebtStatus(debtId, paid) {
  const {error} = await supabase.from('debts').update({paid}).eq('id', debtId).select();

  if (error) {
    throw new Error('Failed to update debt status');
  }
}

export async function getAllDebtorsTotalDebts(debtorId) {
 const {data, error} = await supabase
   .from('debtor_totals')
   .select('*')
   .order('total_debt', {ascending: false})
  if (error) {
    throw new Error('debtor_totals could not be loaded');
  }
  return data;
}
