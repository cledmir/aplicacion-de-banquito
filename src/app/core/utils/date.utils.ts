/**
 * Utilidades para manejo de meses en formato 'mes-año' (ej: 'dic-2024', 'ene-2025').
 */
export class DateUtils {
  private static readonly MONTH_NAMES: Record<string, string> = {
    'ene': 'Enero',
    'feb': 'Febrero',
    'mar': 'Marzo',
    'abr': 'Abril',
    'may': 'Mayo',
    'jun': 'Junio',
    'jul': 'Julio',
    'ago': 'Agosto',
    'set': 'Setiembre',
    'oct': 'Octubre',
    'nov': 'Noviembre',
    'dic': 'Diciembre',
  };

  private static readonly MONTH_ORDER = [
    'ene', 'feb', 'mar', 'abr', 'may', 'jun',
    'jul', 'ago', 'set', 'oct', 'nov', 'dic',
  ];

  /**
   * Genera la lista de meses para un período (ej: dic-2024 a dic-2025).
   */
  static generatePeriodMonths(startDate: Date, endDate: Date): string[] {
    const months: string[] = [];
    const current = new Date(startDate.getFullYear(), startDate.getMonth(), 1);
    const end = new Date(endDate.getFullYear(), endDate.getMonth(), 1);

    while (current <= end) {
      const monthKey = this.MONTH_ORDER[current.getMonth()];
      const year = current.getFullYear();
      months.push(`${monthKey}-${year}`);
      current.setMonth(current.getMonth() + 1);
    }

    return months;
  }

  /**
   * Convierte 'ene-2025' → 'Enero 2025'.
   */
  static formatMonthDisplay(monthKey: string): string {
    const [month, year] = monthKey.split('-');
    const monthName = this.MONTH_NAMES[month];
    return monthName ? `${monthName} ${year}` : monthKey;
  }

  /**
   * Convierte 'ene-2025' → 'Ene 2025'.
   */
  static formatMonthShort(monthKey: string): string {
    const [month, year] = monthKey.split('-');
    const capitalized = month.charAt(0).toUpperCase() + month.slice(1);
    return `${capitalized} ${year}`;
  }

  /**
   * Obtiene el mes actual en formato 'mes-año'.
   */
  static getCurrentMonth(): string {
    const now = new Date();
    const monthKey = this.MONTH_ORDER[now.getMonth()];
    return `${monthKey}-${now.getFullYear()}`;
  }

  /**
   * Obtiene el índice del mes siguiente al dado.
   */
  static getNextMonth(monthKey: string, availableMonths: string[]): string | null {
    const index = availableMonths.indexOf(monthKey);
    if (index === -1 || index >= availableMonths.length - 1) return null;
    return availableMonths[index + 1];
  }

  /**
   * Retorna la cantidad de meses restantes desde un mes dado.
   */
  static getRemainingMonths(fromMonth: string, availableMonths: string[]): number {
    const index = availableMonths.indexOf(fromMonth);
    if (index === -1) return 0;
    return availableMonths.length - index;
  }

  /**
   * Convierte una fecha de Firestore Timestamp a Date.
   */
  static fromFirestoreTimestamp(timestamp: { seconds: number; nanoseconds: number }): Date {
    return new Date(timestamp.seconds * 1000);
  }
}
