import { FundType } from '../enums';
import { LoanCalculation, LoanInstallment } from '../models';

/**
 * Calculadora de interés para los dos tipos de fondo.
 *
 * Banquito  → Interés compuesto: Cuota = M × [r(1+r)^n] / [(1+r)^n - 1]
 * Canastita → Interés simple:    Cuota = M × (1 + r × n) / n
 */
export class InterestCalculator {
  /**
   * Calcula la cuota mensual y genera el desglose de pagos.
   */
  static calculate(
    fundType: FundType,
    amount: number,
    installmentCount: number,
    interestRate: number,
    startMonth: string,
    availableMonths: string[],
  ): LoanCalculation {
    const monthlyPayment =
      fundType === FundType.BANQUITO
        ? this.compoundInterestPayment(amount, interestRate, installmentCount)
        : this.simpleInterestPayment(amount, interestRate, installmentCount);

    const roundedPayment = this.roundTenth(monthlyPayment);
    const totalToPay = this.roundTenth(roundedPayment * installmentCount);
    const interestGenerated = this.roundTenth(totalToPay - amount);

    const installments = this.generateInstallments(
      roundedPayment,
      installmentCount,
      startMonth,
      availableMonths,
    );

    return {
      monthlyPayment: roundedPayment,
      totalToPay,
      interestGenerated,
      installments,
    };
  }

  /**
   * Interés compuesto (Banquito).
   * Fórmula: M × [r(1+r)^n] / [(1+r)^n - 1]
   */
  static compoundInterestPayment(
    principal: number,
    monthlyRate: number,
    months: number,
  ): number {
    if (months === 0) return 0;
    if (months === 1) return principal * (1 + monthlyRate);

    const factor = Math.pow(1 + monthlyRate, months);
    return principal * (monthlyRate * factor) / (factor - 1);
  }

  /**
   * Interés simple (Canastita).
   * Fórmula: M × (1 + r × n) / n
   */
  static simpleInterestPayment(
    principal: number,
    monthlyRate: number,
    months: number,
  ): number {
    if (months === 0) return 0;
    return (principal * (1 + monthlyRate * months)) / months;
  }

  /**
   * Calcula el total a pagar con interés compuesto para N cuotas.
   */
  static compoundTotal(
    principal: number,
    monthlyRate: number,
    months: number,
  ): number {
    const payment = this.compoundInterestPayment(principal, monthlyRate, months);
    return this.roundTenth(payment * months);
  }

  /**
   * Calcula el total a pagar con interés simple para N cuotas.
   */
  static simpleTotal(
    principal: number,
    monthlyRate: number,
    months: number,
  ): number {
    return this.roundTenth(principal * (1 + monthlyRate * months));
  }

  /**
   * Genera las cuotas con sus meses correspondientes.
   */
  private static generateInstallments(
    monthlyPayment: number,
    count: number,
    startMonth: string,
    availableMonths: string[],
  ): LoanInstallment[] {
    const startIndex = availableMonths.indexOf(startMonth);
    if (startIndex === -1) {
      throw new Error(`Mes de inicio "${startMonth}" no encontrado en los meses disponibles.`);
    }

    const installments: LoanInstallment[] = [];
    for (let i = 0; i < count; i++) {
      const monthIndex = startIndex + i;
      if (monthIndex >= availableMonths.length) {
        throw new Error(
          `No hay suficientes meses disponibles para ${count} cuotas desde "${startMonth}".`,
        );
      }

      installments.push({
        month: availableMonths[monthIndex],
        amount: monthlyPayment,
        paid: false,
        paidAt: null,
      });
    }

    return installments;
  }

  /**
   * Redondea a 1 decimal estándar.
   * Ej: 308.44 → 308.40, 308.45 → 308.50
   */
  static roundTenth(value: number): number {
    return Math.round(value * 10) / 10;
  }
}
