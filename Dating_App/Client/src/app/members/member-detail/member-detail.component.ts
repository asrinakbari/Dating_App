import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Member } from '../../_models/member';
import { MembersService } from '../../_services/members.service';
import { NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { NgxGalleryImage } from '@kolkov/ngx-gallery';
import { NgxGalleryAnimation } from '@kolkov/ngx-gallery';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  member: Member;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(private memberService: MembersService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.loadMember();
    this.galleryOptions = [
      {
        width: '500px',
        height: '500px',
        preview: false,
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide
      }
    ]

  }

    getImages(): NgxGalleryImage[] {
      const imageUrls = [];
      for (const photo of this.member.Photos) {
        imageUrls.push({
          small: photo?.Url,
          medium: photo?.Url,
          big: photo?.Url
        })
      }
      return imageUrls;
    }

    loadMember() {
      this.memberService.getMember(this.route.snapshot.paramMap.get('UserName')).subscribe(member => {
        this.member = member;
        this.galleryImages = this.getImages();
      })
    }

}
