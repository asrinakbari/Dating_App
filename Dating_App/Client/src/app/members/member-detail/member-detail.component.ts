import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Member } from '../../_models/member';
import { MembersService } from '../../_services/members.service';
import { NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { NgxGalleryImage } from '@kolkov/ngx-gallery';
import { NgxGalleryAnimation } from '@kolkov/ngx-gallery';
import { ViewChild } from '@angular/core';
import { TabDirective, TabsetComponent } from 'ngx-bootstrap/tabs';
import { MessageService } from '../../_services/message.service';
import { Message } from '../../_models/message';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  member: Member;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  @ViewChild('memberTabs', { static: true }) memberTabs: TabsetComponent;
  activeTab: TabDirective;
  messages: Message[];


  constructor(private memberService: MembersService, private route: ActivatedRoute, private messageService: MessageService) { }

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

    this.route.queryParams.subscribe(params => {
      var tab = JSON.stringify(params);
      tab ? this.selectTab(3) : this.selectTab(0);
    })

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

  loadMessages() {
    this.messageService.getMessageThread(this.member.UserName).subscribe(messages => {
      this.messages = messages;
    })
  }

  selectTab(tabId: number) {
    this.memberTabs.tabs[tabId].active = true;
  }

  onTabActivated(data: TabDirective) {
    this.activeTab = data;
    if (this.activeTab.heading === 'Messages' && this.messages.length === 0) {
      this.loadMessages();
    }
  }



}
