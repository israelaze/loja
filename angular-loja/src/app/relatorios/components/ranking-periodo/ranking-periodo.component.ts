import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AlertService } from 'src/app/util/services/alert.service';
import { RelatoriosService } from '../../services/relatorios.service';

@Component({
  selector: 'app-ranking-periodo',
  templateUrl: './ranking-periodo.component.html',
  styleUrls: ['./ranking-periodo.component.scss']
})
export class RankingPeriodoComponent {


  maxDataInicio = new Date();

  constructor(
    private formBuilder: FormBuilder,
    private relatoriosService: RelatoriosService,
    private datePipe: DatePipe,
    private alertService: AlertService,
  ){}


  periodo = this.formBuilder.group({

    dataInicio: [null],
    dataFim: [null]
  },{validator: this.validarDatas});

  gerar(): void {
    const { dataInicio, dataFim } = this.periodo.value;

    const dataInicioFormatada = this.datePipe.transform(dataInicio, 'yyyy-MM-dd');
    const dataFimFormatada = this.datePipe.transform(dataFim, 'yyyy-MM-dd');

    console.log(dataInicioFormatada);
    console.log(dataFimFormatada);

    this.relatoriosService.gerarRankingPorPeriodo(dataInicioFormatada, dataFimFormatada).subscribe({
      next: result => {
        console.log(result);
        const blob = new Blob([result], {type: result.type});
        const url = window.URL.createObjectURL(blob);
       //window.open(url);
        //IE
        if (window.navigator && (window.navigator as any).msSaveOrOpenBlob){
          (window.navigator as any).msSaveOrOpenBlob(blob, 'relatorio.pdf');
          return;
        }
        //Chrome
        const link = document.createElement('a');
        link.href = url;
        link.download = 'relatorio.pdf';
        link.click();
        window.URL.revokeObjectURL(url);
        link.remove();
      },
      error: (error: HttpErrorResponse) => {
        if (error instanceof HttpErrorResponse) {
          console.error('Erro HTTP:', error);

          // Verificar se o corpo da resposta de erro é um ArrayBuffer
          if (error.error instanceof ArrayBuffer) {
            // Converter o ArrayBuffer em uma string (pode precisar ajustar o encoding)
            const errorString = new TextDecoder('utf-8').decode(error.error);
            const errorMessage = this.extractErrorMessage(errorString);
            console.log('Mensagem de erro:', errorMessage);
            this.alertService.error(errorMessage || 'Erro desconhecido');
          } else {
            // Se não for um ArrayBuffer, exibir a mensagem de erro diretamente
            const errorMessage = this.extractErrorMessage(error.error);
            console.log('Mensagem de erro:', errorMessage);
            this.alertService.error(errorMessage || 'Erro desconhecido');
          }
        } else {
          // Se não for um HttpErrorResponse, ainda podemos tratar como uma mensagem de erro genérica
          console.error('Erro inesperado:', error);
          this.alertService.error('Erro inesperado');
        }
      }
    });

  }

  // Extrai a mensagem de erro do JSON
  private extractErrorMessage(errorString: string): string {
  try {
    const errorObject = JSON.parse(errorString);
    return errorObject?.message || 'Erro desconhecido';
  } catch (e) {
    console.error('Erro ao analisar a mensagem de erro:', e);
    return 'Erro ao processar a mensagem de erro';
  }
}

  validarDatas(group: FormGroup): { [key: string]: boolean } | null {
    const { dataInicio, dataFim } = group.value;

    if (dataInicio && dataFim && new Date(dataFim) < new Date(dataInicio)) {
      group.setErrors({'datasInvalidas': true});
      return { 'datasInvalidas': true };
    }

    return null;
  }

  private onError(e: any) {
    this.alertService.error(e.error.message);
  }

  limparFormulario(){
    this.periodo.reset();
  }

  // Botão voltar à página anterior
  voltar(){
    history.go(-1);
  }
}
