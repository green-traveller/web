import {Injectable} from '@angular/core';
import {Route} from '../models/route';
import {formatNumber} from '@angular/common';
import {RouteService} from './route.service';
import {DataService} from './data.service';

@Injectable({
  providedIn: 'root'
})
export class CalcService {

  constructor(private dataService: DataService, private routeService: RouteService) { }

  public getRoutesLastXDays(days: number): Route[] {
    const routesLastXDays = [];
    const routes = this.dataService.getRoutes();
    const today = Date.now();
    const dayInMilliseconds = 24 * 3600 * 1000;
    const startDate  = new Date(today - (days * dayInMilliseconds));
    const startDateStr = this.getDateString(startDate);
    for (const route of routes) {
      const routeDate = route.time.split(' ')[0];
      if (startDateStr < routeDate && routeDate <= this.getDateString(new Date(today))){
        routesLastXDays.push(route);
      }
    }
    return routesLastXDays;
  }

  public getRoutesLastXMonthsInclCurrent(months: number): Route[] {
    const routes = this.dataService.getRoutes();
    const today = new Date();
    const startDate = new Date();
    startDate.setMonth(today.getMonth() - months + 1);
    startDate.setDate(1);
    const endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    const startDateString = this.getDateString(startDate);
    const endDateString = this.getDateString(endDate);
    return routes.filter(route => {
      const routeDate = route.time.split(' ')[0];
      return (startDateString <= routeDate && routeDate <= endDateString);
    });
  }

  public getDateString(date: Date): string {
    return date.getFullYear() + '-' + formatNumber((date.getMonth() + 1), 'en_US', '2.0-0') + '-' + formatNumber(date.getDate(), 'en_US', '2.0-0');
  }

  public getLastXDaysStrings(days: number): string[] {
    const today = Date.now();
    const dayInMiliseconds = 24 * 3600 * 1000;
    const lastXDaysStrings = [];
    for (let i = 0; i < days; i++) {
      const date = new Date(today - (i * dayInMiliseconds));
      const dateStr = this.getDateString(date);
      lastXDaysStrings.push(dateStr);
    }
    lastXDaysStrings.reverse();
    return lastXDaysStrings;
  }

  public getLastXMonthsStrings(x: number): string[] {
    const today = new Date();
    const thisYear: number = today.getFullYear();
    const thisMonth: number = today.getMonth() + 1;
    const lastXMonthsStrings = [];
    for (let i = 0; i < x; i++) {
      let month: number = thisMonth - i;
      let year: number = thisYear;
      while (month <= 0) {
        month += 12;
        year--;
      }
      const monthStr = year.toString() + '-' + formatNumber(month, 'en_US', '2.0-0');
      lastXMonthsStrings.push(monthStr);
    }
    lastXMonthsStrings.reverse();
    return lastXMonthsStrings;
  }

  public getTotalCo2Last30Days(): number {
    let totalCo2Last30Days = 0;
    const routesLast30Days = this.getRoutesLastXDays(30);
    for (const route of routesLast30Days) {
      const co2Route = this.routeService.getCo2Kilograms(route);
      totalCo2Last30Days += co2Route;
    }
    return totalCo2Last30Days;
  }

  public getCo2Last30DaysByVehicle(vehicleType: string): number {
    let co2Last30DaysByVehicle = 0;
    const routesLast30Days = this.getRoutesLastXDays(30);
    for (const route of routesLast30Days) {
      const routeVehicleType = this.routeService.getVehicle(route).type;
      if (routeVehicleType === vehicleType) {
        const co2Route = this.routeService.getCo2Kilograms(route);
        co2Last30DaysByVehicle += co2Route;
      }
    }
    return co2Last30DaysByVehicle;
  }

  public getAvgCo2PerDayLast6MonthsArr(routeService: RouteService): number[] {
    const avgCo2PerDayLast6MonthsArray = [];
    const routesLast6Months = this.getRoutesLastXMonthsInclCurrent(6);
    const last6MonthsStrings = this.getLastXMonthsStrings(6);
    for (const month of last6MonthsStrings) {
      let co2ThisMonth = 0;
      for (const route of routesLast6Months) {
        const routeMonth = route.time.substring(0, 7);
        if (month === routeMonth) {
          const co2Route = routeService.getCo2Kilograms(route);
          co2ThisMonth += co2Route;
        }
      }
      const avgCo2PerDayThisMonth = this.divideByDaysInMonth(co2ThisMonth, month);
      avgCo2PerDayLast6MonthsArray.push(avgCo2PerDayThisMonth);
    }
    return avgCo2PerDayLast6MonthsArray;
  }

  public divideByDaysInMonth(value: number, monthStr: string): number {
    const year = monthStr.substring(0, 4);
    const month = monthStr.substring(5, 7);
    let days: number;
    switch (month) {
      case '01':
      case '03':
      case '05':
      case '07':
      case '08':
      case '10':
      case '12':
        days = 31;
        break;
      case '04':
      case '06':
      case '09':
      case '11':
        days = 30;
        break;
      case '02':
        days = 28;
        const y = Number(year);
        if (y % 4 === 0) {
          days = 29;
          if (y % 100 === 0) {
            days = 28;
            if (y % 400 === 0) {
              days = 29;
            }
          }
        }
        break;
      default:
        days = 30;
        break;
    }
    return value / days;
  }

  public getDistanceLast30DaysByVehicle(routeService: RouteService, vehicleType: string): number {
    let distLast30DaysByVehicle = 0;
    const routesLast30Days = this.getRoutesLastXDays(30);
    for (const route of routesLast30Days) {
      const routeVehicleType = routeService.getVehicle(route).type;
      if (routeVehicleType === vehicleType) {
        const kmRoute = routeService.getDistance(route) / 1000;
        distLast30DaysByVehicle += kmRoute;
      }
    }
    return distLast30DaysByVehicle;
  }

}
