import { Component, Input, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { take } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Member } from '../../_models/member';
import { Photo } from '../../_models/photo';
import { User } from '../../_models/user';
import { AccountService } from '../../_services/account.service';
import { MembersService } from '../../_services/members.service';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {
  @Input() member: Member;
  uploader: FileUploader;
  hasBaseDropzoneOver: false;
  baseUrl = environment.apiUrl;
  user: User;


  constructor(private accountService: AccountService, private memberService: MembersService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
  }

  ngOnInit(): void {
    this.initializeUploader();
  }

  fileOverBase(e: any) {
    this.hasBaseDropzoneOver = e;
  }

  deletePhoto(photoId: number) {
    this.memberService.deletePhoto(photoId).subscribe(() => {
      this.member.Photos = this.member.Photos.filter(x => x.Id !== photoId);
    })
  }
  
  setMainPhoto(photo: Photo) {
    this.memberService.setMainPhoto(photo.Id).subscribe(() => {
      this.user.PhotoUrl = photo.Url;
      this.accountService.setCurrentUser(this.user);
      this.member.PhotoUrl = photo.Url;
      this.member.Photos.forEach(p => {
        if (p.IsMain) p.IsMain = false;
        if (p.Id === photo.Id) p.IsMain = true;
      })
    })
  }


  initializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'users/add-photo',
      authToken: 'Bearer ' + this.user.Token,
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    });

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    }
  }
}

//this.uploader.onSuccessItem = (item, response, status, headers){
//  if (response) {
//    const photo = JSON.parse(response);
//    this.member.Photos.push(photo);
//  }
//}
    
