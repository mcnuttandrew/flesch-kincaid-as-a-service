from flask import Flask, render_template, jsonify, request
import textstat

app = Flask(__name__)


def decorate_response(response):
    """
    Add cors headers to response
    """
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add("Access-Control-Allow-Headers", "*")
    response.headers.add("Access-Control-Allow-Methods", "*")
    return response

@app.route('/')
def static_serve():
    return render_template('index.html')


EASE_LABELS = [
    (90, 100, "Very Easy"),
    (80, 89, "Easy"),
    (70, 79, "Fairly Easy"),
    (60, 69, "Standard"),
    (50, 59, "Fairly Difficult"),
    (30, 49, "Difficult"),
    (0, 29, "Very Confusing")
]
def fk_ease_label(ease):
    for upper, lower, label in EASE_LABELS:
        if ease >= lower and ease < upper:
            return label
    return 'UNKNOWN'

@app.route('/analyze', methods=['POST'])
def analyze():
    print(request)
    str_to_read = request.data.decode("utf-8").strip()


    # ease = textstat.flesch_reading_ease(str_to_read)
    report = {
        "flesch-reading-ease": textstat.flesch_reading_ease(str_to_read),
        "smog-index": textstat.smog_index(str_to_read),
        "flesch-kinkiad-grade": textstat.flesch_kincaid_grade(str_to_read),
        "coleman-liau-index": textstat.coleman_liau_index(str_to_read),
        "automated-readability-index": textstat.automated_readability_index(str_to_read),
        "dale-chall-readability-score": textstat.dale_chall_readability_score(str_to_read),
        "difficult-words": textstat.difficult_words(str_to_read),
        "linsear-write-formula": textstat.linsear_write_formula(str_to_read),
        "gunning-fog": textstat.gunning_fog(str_to_read),
        "text-standard": textstat.text_standard(str_to_read)
    }
    return decorate_response(jsonify(report))

if __name__ == '__main__':
    app.run()
