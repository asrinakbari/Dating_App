import { ViewChild } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Message } from '../../_models/message';
import { MessageService } from '../../_services/message.service';

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.css']
})
export class MemberMessagesComponent implements OnInit {
  @Input() messages: Message[];
  @Input() username: string;
  messageContent: string;
  @ViewChild('messageForm') messageForm: NgForm;
  

  constructor(private messageService: MessageService) {
  }

  ngOnInit(): void {
  }

  sendMessage() {
    this.messageService.sendMessage(this.username, this.messageContent).subscribe((message: Message) => {
      this.messages.push(message);
      this.messageForm.reset();
    })
  }



}
