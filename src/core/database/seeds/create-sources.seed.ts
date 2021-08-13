import {Connection, Repository, getRepository} from 'typeorm'
import {Source} from "../../../common/commissions/sources/entities/Source.entity"

export const CreateSourcesSeed = async () => {
    const repository: Repository<Source> = getRepository(Source)

    const sources = [
        'Перечень поручений Президента РФ',
        'Перечень поручений Правительства РФ, аппарата Правительства РФ',
        'Поручение аппарата полномочного представителя Президента РФ в ЦФО',
        'Поручение администрации Президента РФ',
        'Поручение главного федерального инспектора по Липецкой области',
        'Запросы министерств и ведомств',
        'Протокол координационного Совета по проектному управлению',
        'Протокол оперативного совещания у главы администрации области',
        'Протокол совещания у главы администрации области',
        'Протокол межведомственной комиссии',
        'Протокол президиума администрации области'
    ]

    sources.map(async title => {
        const source = await repository.findOne({where: {title}})
        if (!source) return repository.save(repository.create({title}))
    })

}
