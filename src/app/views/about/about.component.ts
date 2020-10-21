import { Component, OnInit } from '@angular/core';
// @ts-ignore
import { version, homepage, dependencies, license } from '../../../../package.json';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  version = version;
  license = license;
  homepage = homepage;
  dependencies = Object.keys(dependencies);

  constructor() { }

  ngOnInit(): void {
  }

}
