import { Component, inject, OnInit } from '@angular/core';
import { Category } from '../../model/category';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Game } from '../../model/game';
import { GameService } from '../../services/game.service';
import { JsonPipe } from '@angular/common';


@Component({
  selector: 'app-game-add',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './game-add.component.html',
  styleUrl: './game-add.component.css'
})
export class GameAddComponent implements OnInit {


  games: Game[] = [];
  gameService: GameService = inject(GameService);
  readonly fb: FormBuilder = inject(FormBuilder);
  gameForm!: FormGroup;

  categories = Object.values(Category);
  // gameForm: FormGroup = new FormGroup({
  //   id: new FormControl(1, {nonNullable:true}),
  //   name: new FormControl("Echec"),
  //   price: new FormControl(46.3),
  //   madeIn: new FormControl('Tunisie'),
  //   category: new FormControl(Category.BoardGames),
  //   isNew: new FormControl(true)
  // })

  ngOnInit(): void {
    this.gameForm = this.fb.nonNullable.group({
      id: [1],
      name: [''],
      price: [0],
      madeIn: ['Tunisie'],
      category: [Category.CardGames],
      isNew: [true]
    })
    this.gameService.getGames().subscribe(
      data => {this.games = data; 
        this.gameForm.get('id')?.setValue(this.games.length+1)
      }
    )

    this.gameForm.get('name')?.valueChanges
      .subscribe(
        (value) => console.log(value)
      )
  }

  onSubmit() {
    /*console.log(this.gameForm.value);
    console.log(this.gameForm.get('name')?.value);
    console.log(this.gameForm.controls['price'].value);
    console.log(this.gameForm.value['category']);
    console.log(this.gameForm.value.madeIn);   */
    this.gameService.addGame(this.gameForm.value).subscribe(
      data => {this.games.push(data);
        this.onResetForm()
      }
    )
  }

  onResetForm() {
    this.gameForm.reset({ category: Category.CardGames, madeIn: 'Autre' });
    this.gameForm.get('id')?.setValue(this.games.length+1);
  }
}
