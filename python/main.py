import ebooklib
from ebooklib import epub
from bs4 import BeautifulSoup
import re
import json

def convert_epub(epub_name):
    book = epub.read_epub(epub_name)

    html_arr = book.get_items_of_type(ebooklib.ITEM_DOCUMENT)

    toc_arr = []
    
    res_arr = []
    for doc in html_arr:
        toc_arr.append((f'{doc.get_name()}', len(res_arr)))
        content = BeautifulSoup(doc.get_content(),'html.parser')
        if(content.h1): res_arr.append(content.h1.get_text())
        if(content.h2): res_arr.append(content.h2.get_text())
        if(content.h3): res_arr.append(content.h3.get_text())
        if(content.h4): res_arr.append(content.h4.get_text())
        if(content.h5): res_arr.append(content.h5.get_text())
        for p in content.find_all('p'):
            for sentence in re.findall(
                "[^\.\?!\:]+[\.\?!\:…]?[\"\”\)]?",
                re.sub("\s{2,}"," ",
                        re.sub("\,\s*$",":",
                              re.sub("( [A-Z])\.", r'\1',
                                p.get_text()
                                .replace('\n',' ')
                                .replace('/t','')
                                .replace('Mr.','Mr')
                                .replace('Mrs.','Mrs')
                                .replace('St.','St')
                                .replace('E.','E')
                                .replace('L.A.','LA')
                                .replace('. …','…')
                                .replace(' . . .','…')
                                .replace('A.M.','AM')
                                .replace('P.M.','PM')
                              )
                        )
                )
            ):
                if not sentence == ' ': res_arr.append(sentence)
            if(len(res_arr)>0): res_arr[-1] = res_arr[-1] + '¶'

    json_string = json.dumps(
        {"title":book.get_metadata('DC','title')[0][0],
         "sentences":res_arr,
         "identifier":book.get_metadata('DC', 'identifier')[0][0],
         "toc": toc_arr}
    )
    return json_string