import { trigger, transition, style, query, animateChild, group, animate } from '@angular/animations';

export const routeTransitionAnimations = trigger('triggerName', [transition('One => Two, One => Three, One => Four, Two => Three, Two => Four, Three => Four', [
  style({ position: 'relative' }),
  query(':enter, :leave', [
    style({
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%'
    })
  ]),
  query(':enter', [style({ left: '300px', opacity: 0 })]),
  query(':leave', animateChild()),
  group([
    query(':leave', [animate('0.3s ease-out', style({ left: '-300px', opacity: 0 }))]),
    query(':enter', [animate('0.3s ease-out', style({ left: '0%', opacity: 1 }))])
  ]),
  query(':enter', animateChild()),
]), transition('Four => Three, Four => Two, Four => One, Three => Two, Three => One, Two => One', [
  style({ position: 'relative' }),
  query(':enter, :leave', [
    style({
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%'
    })
  ]),
  query(':enter', [style({ left: '-300px', opacity: 0 })]),
  query(':leave', animateChild()),
  group([
    query(':leave', [animate('0.3s ease-out', style({ left: '300px', opacity: 0 }))]),
    query(':enter', [animate('0.3s ease-out', style({ left: '0%', opacity: 1 }))])
  ]),
  query(':enter', animateChild())
]), transition('Four => FourDetails, Three => ThreeDetails, Two => TwoDetails, Three => Add, Two => Add, ThreeDetails => ThreeDetailsAddEdition, Four => Add', [
  style({ position: 'relative' }),
  query(':enter, :leave', [
    style({
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%'
    })
  ]),
  query(':enter', [style({ transform: 'perspective(500px) translateY(-100px)', opacity: 0 })]),
  query(':leave', animateChild()),
  group([
    query(':leave', [animate('0.3s ease-out', style({ transform: 'perspective(500px) translateY(-100px)', opacity: 0 }))]),
    query(':enter', [animate('0.3s ease-out', style({ transform: 'perspective(500px) translateY(0%)', opacity: 1 }))])
  ]),
  query(':enter', animateChild())
]), transition('FourDetails => Four, FourDetails => Three, FourDetails => Two, FourDetails => One, ThreeDetails => Four, ThreeDetails => Three, ThreeDetails => Two, ThreeDetails => One, TwoDetails => Four, TwoDetails => Three, TwoDetails => Two, TwoDetails => One, Add => Four, Add => Three, Add=>Two, Add=>One, ThreeDetailsAddEdition => Four,ThreeDetailsAddEdition => Three, ThreeDetailsAddEdition => Two, ThreeDetailsAddEdition => One', [
  style({ position: 'relative' }),
  query(':enter, :leave', [
    style({
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%'
    })
  ]),
  query(':enter', [style({ transform: 'perspective(500px) translateY(-100px)', opacity: 0 })]),
  query(':leave', animateChild()),
  group([
    query(':leave', [animate('0.3s ease-out', style({ transform: 'perspective(500px) translateY(-100px)', opacity: 0 }))]),
    query(':enter', [animate('0.3s ease-out', style({ transform: 'perspective(500px) translateY(0px)', opacity: 1 }))])
  ]),
  query(':enter', animateChild())
])
])