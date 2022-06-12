import { Component,  Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  activePage!: number
  isDisabled = true

  @Input() limit!: number
  @Input() pageNumbers: number[] = []
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.activePage = params['id']
    })

  }
  onPrevious() {
    this.router.navigate([`../${--this.activePage}`], { relativeTo: this.activatedRoute })

  }
  onNext() {
    this.router.navigate([`../${++this.activePage}`], { relativeTo: this.activatedRoute })
  }

}
