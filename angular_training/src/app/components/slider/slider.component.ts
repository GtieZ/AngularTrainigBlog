import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {

  @Input() sliderTitle!: string;
  @Input() size: string | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
