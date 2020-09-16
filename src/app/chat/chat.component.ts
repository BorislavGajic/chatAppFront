import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {ChatService, Message} from '../services/chat.service';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {UsersService} from '../services/users.service';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  ChatForm = this.formBuilder.group({
    sender: [''],
    receivers: [''],
    content: [''],
  });
  agents: any = [];
  text = '';

  messages: Message [] = [];
  newMessage: { [key: string]: boolean; } = {};
  curentuser = localStorage.getItem('currentuser');
  selected = 'All';
  online: any = [];
  onlineUsers: string [] = [];

  constructor(private formBuilder: FormBuilder, private chatService: ChatService, private authService: AuthService,
              private router: Router, private service: UsersService) {
    chatService.messages.subscribe(msg => {
      console.log('Response from websocket: ' + msg.subject);
      this.messages.push(msg);
      if (msg.receiver !== 'All') {
        this.newMessage[msg.sender] = true;
      }
      else{
        if (msg.sender !== this.curentuser) {
          this.newMessage[msg.receiver] = true;
        }
      }
    });
  }

  ngOnInit(): void {
    this.service.isLoggedIn(localStorage.getItem('currentuser')).subscribe(
      data => {
        if (data !== 'Korisnik je ulogovan'){
          localStorage.removeItem('currentuser');
          this.router.navigate(['/']);
        }
      }
    );
    console.log('user-' + (localStorage.getItem('currentuser')));
    this.online = this.service.getOnline().subscribe(
      data => {
        this.online = data;
        for (const d of this.online) {
          this.onlineUsers.push(d);
          this.newMessage[d] = false;
        }
      }
    );
    let temp: any = [];
    temp = this.service.getAll(localStorage.getItem('currentuser')).subscribe(
      data => {
        temp = data;
        console.log(temp);
        for (const tmp of temp) {
          this.messages.push(tmp);
        }
      });
  }



  // tslint:disable-next-line:typedef
  proba(a) {
    this.newMessage[a] = false;
    this.selected = a;
  }

  // tslint:disable-next-line:typedef
  send() {
    const message = {receiver: this.selected, sender: localStorage.getItem('currentuser'),
      dateTime: formatDate(new Date(), 'dd/MM/yyyy HH:mm:ss', 'en'),
      subject: (document.getElementById('messageField')as HTMLInputElement).value};

    this.chatService.messages.next(message);

    (document.getElementById('messageField')as HTMLInputElement).value = '';
  }

  // tslint:disable-next-line:typedef
  logout() {
    const user = JSON.stringify({
      username: localStorage.getItem('currentuser'),
      password: '',
    });
    this.authService.logout(user).subscribe((ok) => {
      localStorage.removeItem('currentuser');
      this.authService.disconect();
      this.router.navigate(['/']);
    });

  }
}
