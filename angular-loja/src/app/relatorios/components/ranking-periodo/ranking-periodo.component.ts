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
      next: (result: Blob) => {
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

          if (error.status === 403) {
            // Handle 403 Forbidden error
            this.alertService.error('Acesso proibido. Verifique suas permissões.');
          }  else if (error.error instanceof Blob) {
            // Verificar se o corpo da resposta de erro é um Blob
            this.readBlobAsText(error.error).then(errorMessage => {
              console.log('Mensagem de erro:', errorMessage);
              this.alertService.error(errorMessage || 'Erro desconhecido');
            }).catch(blobError => {
              console.error('Erro ao converter Blob para texto:', blobError);
              this.alertService.error('Erro ao processar a mensagem de erro');
            });
          } else {
            // Se não for um Blob, exibir a mensagem de erro diretamente
            const errorMessage = this.extractErrorMessage(error.error);
            console.log('Mensagem de erro:', errorMessage);
            this.alertService.error(errorMessage || 'Erro desconhecido');
          }
        } else {
          // Handle other errors
          this.alertService.error('Erro desconhecido. Tente novamente mais tarde.');
        }
      }
    });

  }

  // Função para converter Blob para texto
private readBlobAsText(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsText(blob);
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
