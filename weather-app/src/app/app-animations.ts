import { trigger, transition, style, animate, useAnimation } from '@angular/animations';
import {
  bounce,
  fadeOutLeft,
  fadeInLeft,
  fadeOutUp,
  fadeOut,
  fadeInUp,
  fadeInDown,
  fadeInRight,
  fadeOutDown,
  flash,
  pulse,
  rubberBand,
  tada,
  wobble,
  bounceIn,
  fadeIn,
  jackInTheBox,
  hinge,
  rollIn,
  zoomIn,
} from 'ng-animate';

export const searchAnim = trigger('searchAnim', [
  transition('void => *', [style({ opacity: 0 }), animate('2.5s')]),
]);
export const sidebarAnim = trigger('sidebarAnim', [
  transition('void => *', useAnimation(fadeInLeft, {params: {timing: .5}})),
]);
export const daysAnim = trigger('daysAnim', [
  transition('void => *', useAnimation(zoomIn, {params: {timing: 1}})),
]);
export const showArrow = trigger('showArrow', [
  transition('void => *', useAnimation(fadeInRight, {params: {timing: .5}})),
]);
